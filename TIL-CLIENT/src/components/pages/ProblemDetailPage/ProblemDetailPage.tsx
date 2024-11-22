import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Modal } from 'antd';
import Loading from '@components/common/loading/Loading';
import { useToast } from '@components/common/notification/ToastProvider';
import BasicPageLayout from '@components/layout/BasicPageLayout';
import { TOAST_TYPE } from '@constants/toast';
import { getGradingResultColor, GRADING_STATUS } from '@constants/grading';
import {
  SubmitInfo,
  getProblemDetail,
  getSubmitResult,
  submitProblem,
  toggleFavorite,
} from '@services/api/problemService';
import { ProblemDetailInfo } from '@type/problem';
import { getErrorMessage } from '@utils/errorHandler';
import { GradingResult } from '@type/grading';
import useAuthStore from '@store/useAuthStore';
import useLoadingStore from '@store/useLoadingStore';
import useCategoryStore from '@store/useCategoryStore';
import { BookMarkIcon } from '@styles/IconSvgStyle';
import {
  QuestionCircleOutlined,
  MessageOutlined,
  RedoOutlined,
  FileDoneOutlined,
} from '@ant-design/icons';
import { CategoryTag } from '@styles/TagStyle';
import {
  ProblemDetailContainer,
  ProblemInfoBar,
  ProblemInfo,
  Title,
  Category,
  Question,
  BottomBar,
  ContentContainer,
  QuestionSection,
  AnswerSection,
  ModalInnerButton,
  ModalInnerText,
  TextDiv,
  ButtonGroup,
  InfoGroup,
  QuestionTitle,
  TabMenuItem,
  TabMenu,
  LevelText,
  ProblemSolveFooterButton,
} from './ProblemDetailPage.style';
import ProblemHistory from './ProblemHistoryTab';

const ANSWER = 'answer';
const HISTORY = 'history';

const ProblemDetailPage: React.FC = () => {
  const { notify } = useToast();
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };
  const [problemDetail, setProblemDetail] = useState<ProblemDetailInfo>({} as ProblemDetailInfo);
  const [error, setError] = useState<string | null>();
  const [answer, setAnswer] = useState<string>('');
  const [result, setResult] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(ANSWER);
  const [loadingSubmitResult, setLoadingSubmitResult] = useState(false);
  const { isAuthenticated, checkAuthentication } = useAuthStore();
  const { getIsLoading, setIsLoading } = useLoadingStore();
  const { categoryList, getCategoryList } = useCategoryStore();
  const INTERVAL_REFRESH_TIME = 1500;

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    if (!id) {
      setError('문제 정보를 가져오는 중 오류가 발생했습니다.');
      return;
    }
    const fetchProblemDetail = async () => {
      try {
        setIsLoading(true);
        await getCategoryList();
        const response = await getProblemDetail(id);
        if (!response.result || !response.result.problemInfo) {
          throw new Error('문제 정보를 가져오는 중 오류가 발생했습니다.');
        }
        setProblemDetail(response.result.problemInfo);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProblemDetail();
  }, [getCategoryList, id, setIsLoading]);

  useEffect(() => {
    if (error) {
      notify({
        message: '문제 정보 로딩 실패',
        description: error,
        type: TOAST_TYPE.ERROR,
      });
      navigate('/problem');
    }
  }, [error, navigate, notify]);

  const handleSubmit = async () => {
    if (activeTab === HISTORY || loadingSubmitResult) {
      return;
    }

    if (answer.trim() === '') {
      notify({
        message: '답변 제출 실패',
        description: '답변을 입력해주세요.',
        type: TOAST_TYPE.ERROR,
      });
      return;
    }

    try {
      const response = await submitProblem(id, answer);
      const submitInfo = response.result?.submitInfo as SubmitInfo;

      setLoadingSubmitResult(true);
      const intervalId = setInterval(async () => {
        const response2 = await getSubmitResult(id, submitInfo.submitId);
        const gradingResult = response2.result?.gradingResult as GradingResult;

        if (gradingResult.status === GRADING_STATUS.COMPLETED) {
          setResult(`${gradingResult.result}`);
          clearInterval(intervalId);
          setIsModalVisible(true);
          setLoadingSubmitResult(false);
        } else if (gradingResult.status === GRADING_STATUS.ERROR) {
          setResult('채점 중 오류가 발생했습니다. 관리자에게 문의하세요.');
          clearInterval(intervalId);
          setIsModalVisible(true);
          setLoadingSubmitResult(false);
        }
      }, INTERVAL_REFRESH_TIME);
    } catch (err) {
      setError(getErrorMessage(err));
      setLoadingSubmitResult(false);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setResult(undefined);
  };

  const handleMoveHistoryTab = () => {
    setIsModalVisible(false);
    setResult(undefined);
    setActiveTab(HISTORY);
  };

  const handleReset = () => {
    setAnswer('');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleViewOtherAnswers = () => {
    navigate(`/problem/${id}/answers`);
  };

  const handleClickFavorite = async () => {
    if (!isAuthenticated) {
      notify({
        message: '즐겨찾기 추가 실패',
        description: '로그인이 필요합니다.',
        type: TOAST_TYPE.ERROR,
      });
      return;
    }

    try {
      await toggleFavorite(problemDetail.id, !problemDetail.isFavorite);
      setProblemDetail({ ...problemDetail, isFavorite: !problemDetail.isFavorite });
    } catch (err) {
      setError('즐겨찾기 업데이트에 실패했습니다.');
    }
  };

  if (getIsLoading()) {
    return <Loading />;
  }

  return (
    <BasicPageLayout>
      <ProblemDetailContainer>
        <ProblemInfoBar>
          <InfoGroup>
            <BookMarkIcon
              isFavorite={problemDetail?.isFavorite ?? false}
              onClick={handleClickFavorite}
            />
            <Title>{problemDetail && problemDetail.title}</Title>
            <Category>
              {Array.isArray(problemDetail.categoryList)
                ? problemDetail.categoryList.map((categoryId) => {
                    const category = categoryList.find((c) => c.id === categoryId);
                    return category ? (
                      <CategoryTag key={category.id} tagColor={category.color}>
                        {category.tag}
                      </CategoryTag>
                    ) : null;
                  })
                : null}
            </Category>
          </InfoGroup>
          <InfoGroup>
            <ProblemInfo>
              난이도
              <LevelText>Lv.{problemDetail.level}</LevelText>
            </ProblemInfo>
            <ProblemInfo>완료한 사람 {problemDetail.finishCount}명</ProblemInfo>
            <ProblemInfo>정답률 {problemDetail.passRate}%</ProblemInfo>
          </InfoGroup>
        </ProblemInfoBar>
        <ContentContainer>
          <QuestionSection>
            <QuestionTitle>문제 설명</QuestionTitle>
            <Question>{problemDetail?.question}</Question>
          </QuestionSection>
          <AnswerSection>
            <TabMenu>
              <TabMenuItem active={activeTab === ANSWER} onClick={() => setActiveTab(ANSWER)}>
                답변
              </TabMenuItem>
              {isAuthenticated && (
                <TabMenuItem active={activeTab === HISTORY} onClick={() => setActiveTab(HISTORY)}>
                  내 답변 기록
                </TabMenuItem>
              )}
            </TabMenu>
            {activeTab === ANSWER && (
              <TextDiv
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder={
                  isAuthenticated ? '답변을 입력하세요.' : '로그인 후, 답변을 입력하세요.'
                }
                disabled={!isAuthenticated}
              />
            )}
            {activeTab === HISTORY && id && <ProblemHistory problemId={id} />}
          </AnswerSection>
        </ContentContainer>
        <Modal
          title="채점 결과"
          centered
          width={300}
          open={isModalVisible}
          footer={[
            <ModalInnerButton key="back" onClick={handleMoveHistoryTab}>
              피드백 보러가기
            </ModalInnerButton>,
          ]}
          onCancel={handleModalClose}
        >
          <ModalInnerText color={getGradingResultColor(result)}>
            {result === 'PASS' ? '🥰' : '😓'}
          </ModalInnerText>
        </Modal>
      </ProblemDetailContainer>
      <BottomBar>
        {!isAuthenticated ? (
          <ProblemSolveFooterButton type="PURPLE" onClick={handleLoginRedirect}>
            로그인하기
          </ProblemSolveFooterButton>
        ) : (
          <>
            <ButtonGroup>
              <ProblemSolveFooterButton type="">
                <QuestionCircleOutlined />
                질문하기
              </ProblemSolveFooterButton>
              <ProblemSolveFooterButton type="" onClick={handleViewOtherAnswers}>
                <MessageOutlined />
                다른 사람의 답변
              </ProblemSolveFooterButton>
            </ButtonGroup>
            <ButtonGroup>
              <ProblemSolveFooterButton type="RED" onClick={handleReset}>
                <RedoOutlined />
                답변 초기화
              </ProblemSolveFooterButton>
              <ProblemSolveFooterButton type="PURPLE" onClick={handleSubmit}>
                <FileDoneOutlined />
                답변 제출
              </ProblemSolveFooterButton>
            </ButtonGroup>
          </>
        )}
      </BottomBar>
    </BasicPageLayout>
  );
};

export default ProblemDetailPage;
