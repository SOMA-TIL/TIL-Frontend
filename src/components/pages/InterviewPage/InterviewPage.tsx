import MinimalPageLayout from '@components/layout/MinimalPageLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_POS, TOAST_TYPE } from '@constants/toast';
import {
  getInterviewInfo,
  solveInterviewProblem,
  submitInterview,
} from '@services/api/InterviewService';
import { InterviewProblemInfo } from '@type/interview';
import useLoadingStore from '@store/useLoadingStore';
import useCategoryStore from '@store/useCategoryStore';
import Loading from '@components/common/loading/Loading';
import { INTERVIEW_PROBLEM_STATUS } from '@constants/interview';
import InterviewHeader from './InterviewHeader';
import InterviewFooter from './InterviewFooter';
import InterviewMain from './InterviewMain';
import InterviewInfo from './InterviewInfo';

const InterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { notify } = useToast();

  const { code } = useParams<{ code: string }>();

  const { getCategoryList, categoryList } = useCategoryStore();
  const { getIsLoading, setIsLoading } = useLoadingStore();

  const [createdDate, setCreatedDate] = useState<string>();
  const [categoryIdList, setCategoryIdList] = useState<number[]>([]);

  const [solvedProblemList, setSolvedProblemList] = useState<InterviewProblemInfo[]>([]);
  const [unsolvedProblemList, setUnsolvedProblemList] = useState<InterviewProblemInfo[]>([]);

  const [currentSequence, setCurrentSequence] = useState<number>(1);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');

  const fetchCategoryList = async () => {
    try {
      setIsLoading(true);
      await getCategoryList();
    } catch (error) {
      notify({
        message: '카테고리 데이터 로딩 실패',
        description: '카테고리 정보를 불러오지 못했습니다.',
        type: TOAST_TYPE.ERROR,
        placement: TOAST_POS.TOP,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();

    const promise = getInterviewInfo(code as string);
    const getData = () => {
      promise
        .then((data) => {
          // todo: 날짜 데이터 연관성 있게 처리하도록 수정
          const slicedCreatedDate = (data.result?.createdDate as string).substring(0, 10);
          setCreatedDate(slicedCreatedDate);
          setCategoryIdList(data.result?.categoryIdList as number[]);

          const tempProblemList = data.result?.problemList as InterviewProblemInfo[];
          const sortedProblemList = tempProblemList.sort((a, b) => a.sequence - b.sequence);
          return sortedProblemList;
        })
        .then((sortedProblemList) => {
          setSolvedProblemList(
            sortedProblemList.filter(
              (problem) => problem.status === INTERVIEW_PROBLEM_STATUS.SOLVED,
            ),
          );
          setUnsolvedProblemList(
            sortedProblemList.filter(
              (problem) => problem.status === INTERVIEW_PROBLEM_STATUS.UNSOLVED,
            ),
          );
        })
        .then(() => {
          if (unsolvedProblemList.length === 0) {
            setCurrentSequence(solvedProblemList.length + 1);
            return;
          }

          const tempSequence = unsolvedProblemList[0].sequence;
          setCurrentSequence(tempSequence as number);
        })
        .catch((error) => {
          notify({
            message: '모의면접 데이터 로딩 실패',
            description: error.message,
            type: TOAST_TYPE.ERROR,
            placement: TOAST_POS.TOP,
          });
          navigate(`/interview`);
        });
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, navigate, notify]);

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentAnswer(e.currentTarget.value);
  };

  const handleAnswerSkip = async () => {
    if (unsolvedProblemList.length === 0) return;

    const ans = 'SKIP';
    const seq = currentSequence;

    const newSolvedProblem = unsolvedProblemList.find(
      (problem) => problem.sequence === seq,
    ) as InterviewProblemInfo;
    newSolvedProblem.answer = ans;
    newSolvedProblem.status = INTERVIEW_PROBLEM_STATUS.SOLVED;

    await solveInterviewProblem(code as string, {
      sequence: seq,
      answer: ans,
    });

    setSolvedProblemList([...solvedProblemList, newSolvedProblem]);
    setUnsolvedProblemList(unsolvedProblemList.filter((problem) => problem.sequence !== seq));
    setCurrentSequence(seq + 1);
    setCurrentAnswer('');
  };

  const handleAnswerRefresh = () => {
    setCurrentAnswer('');
  };

  const handleAnswerSubmit = async () => {
    if (currentAnswer.length === 0) return;
    if (unsolvedProblemList.length === 0) return;

    const seq = currentSequence;

    const newSolvedProblem = unsolvedProblemList.find(
      (problem) => problem.sequence === seq,
    ) as InterviewProblemInfo;
    newSolvedProblem.answer = currentAnswer;
    newSolvedProblem.status = INTERVIEW_PROBLEM_STATUS.SOLVED;

    await solveInterviewProblem(code as string, {
      sequence: currentSequence,
      answer: currentAnswer,
    });

    setSolvedProblemList([...solvedProblemList, newSolvedProblem]);
    setUnsolvedProblemList(unsolvedProblemList.filter((problem) => problem.sequence !== seq));
    setCurrentSequence(seq + 1);
    setCurrentAnswer('');
  };

  const handleInterviewSubmit = async () => {
    if (unsolvedProblemList.length !== 0) {
      notify({
        message: '모의면접 종료 실패',
        description: '답변하지 않은 질문이 있습니다!',
        type: TOAST_TYPE.ERROR,
        placement: TOAST_POS.TOP,
      });

      return;
    }

    await submitInterview(code as string);

    notify({
      message: '모의면접 종료',
      description: '면접이 성공적으로 종료되었습니다!',
      type: TOAST_TYPE.SUCCESS,
      placement: TOAST_POS.TOP,
    });

    // todo: !!! 면접 채점 결과 관련 로직 !!
  };

  if (getIsLoading()) {
    return <Loading />;
  }

  return (
    <MinimalPageLayout>
      <InterviewHeader handleInterviewSubmit={handleInterviewSubmit} />
      <InterviewInfo
        code={code as string}
        createdDate={createdDate as string}
        categoryList={categoryList}
        categoryIdList={categoryIdList}
      />
      <InterviewMain
        solvedProblemList={solvedProblemList}
        unSolvedProblemList={unsolvedProblemList}
        currentSequence={currentSequence}
        currentAnswer={currentAnswer}
        handleTextArea={handleTextArea}
      />
      <InterviewFooter
        skipEvent={handleAnswerSkip}
        refreshEvent={handleAnswerRefresh}
        submitEvent={handleAnswerSubmit}
      />
    </MinimalPageLayout>
  );
};

export default InterviewPage;
