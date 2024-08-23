import MinimalPageLayout from '@components/layout/MinimalPageLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_POS, TOAST_TYPE } from '@constants/toast';
import { getInterviewInfo } from '@services/api/InterviewService';
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

          // 3. problemInfo를 세팅한다.
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

  const handleAnswerSkip = () => {
    // todo: 답변 Skip POST 메소드 연결하기
  };
  const handleAnswerRefresh = () => {
    // todo: 작성 칸 초기화하기
  };
  const handleAnswerSubmit = () => {
    if ('작성내용'.length === 0) return;
    if (unsolvedProblemList.length === 0) return;

    const seq = currentSequence;

    const newSolvedProblem = unsolvedProblemList.find(
      (problem) => problem.sequence === seq,
    ) as InterviewProblemInfo;
    newSolvedProblem.answer = '작성한 응답'; // todo: 실제로 작성한 답변 붙이기

    // todo: 답변 POST 메소드 연결하기

    setSolvedProblemList([...solvedProblemList, newSolvedProblem]);
    setUnsolvedProblemList(unsolvedProblemList.filter((problem) => problem.sequence !== seq));
    setCurrentSequence(seq + 1);
  };

  if (getIsLoading()) {
    return <Loading />;
  }

  return (
    <MinimalPageLayout>
      <InterviewHeader />
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
