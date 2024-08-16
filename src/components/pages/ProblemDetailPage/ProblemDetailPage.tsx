import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Tabs, Modal } from 'antd';
import Loading from '@components/common/loading/Loading';
import { useToast } from '@components/common/notification/ToastProvider';
import BasicPageLayout from '@components/layout/BasicPageLayout';
import { TOAST_TYPE } from '@constants/toast';
import { GRADING_STATUS } from '@constants/grading';
import {
  SubmitInfo,
  getProblemDetail,
  getSubmitResult,
  submitProblem,
  toggleFavorite,
} from '@services/api/problemService';
import { ProblemDetailInfo } from '@type/problem';
import { showAlertPopup } from '@utils/showPopup';
import { getErrorMessage } from '@utils/errorHandler';
import { GradingResult } from '@type/grading';
import useAuthStore from '@store/useAuthStore';
import useLoadingStore from '@store/useLoadingStore';
import useCategoryStore from '@store/useCategoryStore';
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
  CustomButton,
  CustomLoginButton,
  StyledTextArea,
  TextDiv,
  ButtonGroup,
  BookMarkIcon,
} from './ProblemDetailPage.style';
import ProblemHistory from './ProblemHistoryTab';

const { TabPane } = Tabs;

const ProblemDetailPage: React.FC = () => {
  const { notify } = useToast();
  const navigate = useNavigate();

  const { id } = useParams() as { id: string };
  const [problemDetail, setProblemDetail] = useState<ProblemDetailInfo>({} as ProblemDetailInfo);
  const [error, setError] = useState<string | null>();
  const [answer, setAnswer] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isAuthenticated, checkAuthentication } = useAuthStore();
  const { getIsLoading, setIsLoading } = useLoadingStore();
  const { getCategoryList, transformCategoryTagList } = useCategoryStore();
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
    if (answer.trim() === '') {
      showAlertPopup('답변을 입력해주세요.');
      return;
    }

    try {
      const response = await submitProblem(id, answer);
      const submitInfo = response.result?.submitInfo as SubmitInfo;
      const intervalId = setInterval(async () => {
        const response2 = await getSubmitResult(id, submitInfo.submitId);
        const gradingResult = response2.result?.gradingResult as GradingResult;

        if (gradingResult.status === GRADING_STATUS.COMPLETED) {
          setResult(`${gradingResult.result}`);
          clearInterval(intervalId);
          setIsModalVisible(true);
        } else if (gradingResult.status === GRADING_STATUS.ERROR) {
          setResult('채점 중 오류가 발생했습니다. 관리자에게 문의하세요.');
          clearInterval(intervalId);
          setIsModalVisible(true);
        }
      }, INTERVAL_REFRESH_TIME);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setResult(null);
  };

  const handleReset = () => {
    setAnswer('');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
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
      {/* todo: 사이드바 사이즈 조절 가능허도록 수정 예정, 내 답변 기록 데이터 API 연동 필요 */}
      <ProblemDetailContainer>
        <ProblemInfoBar>
          <BookMarkIcon
            isFavorite={problemDetail?.isFavorite ?? false}
            onClick={handleClickFavorite}
          />
          <Title>{problemDetail && problemDetail.title}</Title>
          <Category>
            {Array.isArray(problemDetail.categoryList)
              ? transformCategoryTagList(problemDetail.categoryList).join(',')
              : 'None'}
          </Category>
          <ProblemInfo>난이도: {problemDetail?.level}</ProblemInfo>
          <ProblemInfo>완료한 사람: 0명</ProblemInfo>
          <ProblemInfo>정답률: 0%</ProblemInfo>
        </ProblemInfoBar>
        <ContentContainer>
          <QuestionSection>
            <h3>문제 설명</h3>
            <Question>{problemDetail?.question}</Question>
          </QuestionSection>
          <AnswerSection>
            <Tabs defaultActiveKey="1" type="card">
              <TabPane tab="답변" key="1">
                <TextDiv>
                  <StyledTextArea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    rows={25}
                    placeholder="답변을 입력하세요."
                    disabled={!isAuthenticated}
                  />
                </TextDiv>
              </TabPane>
              <TabPane tab="내 답변 기록" key="2" disabled={!isAuthenticated}>
                {id && <ProblemHistory problemId={id} />}
              </TabPane>
            </Tabs>
          </AnswerSection>
        </ContentContainer>
        <BottomBar>
          {!isAuthenticated ? (
            <CustomLoginButton onClick={handleLoginRedirect}>로그인하기</CustomLoginButton>
          ) : (
            <>
              <ButtonGroup>
                <CustomButton>질문하기</CustomButton>
                <CustomButton>다른 사람의 답변</CustomButton>
              </ButtonGroup>
              <ButtonGroup>
                <CustomButton onClick={handleReset}>답변 초기화</CustomButton>
                <CustomButton onClick={handleSubmit}>제출</CustomButton>
              </ButtonGroup>
            </>
          )}
        </BottomBar>
        <Modal
          title="채점 결과"
          open={isModalVisible}
          footer={[
            <CustomButton key="back" onClick={handleModalClose}>
              {}
            </CustomButton>,
          ]}
          onCancel={handleModalClose}
        >
          <p>{result}</p>
        </Modal>
      </ProblemDetailContainer>
    </BasicPageLayout>
  );
};

export default ProblemDetailPage;
