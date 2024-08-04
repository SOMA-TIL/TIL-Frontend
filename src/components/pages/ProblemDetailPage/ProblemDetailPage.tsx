import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProblemDetail, solveProblem } from '@services/api/problemService';
import { ProblemDetailInfo } from '@type/problem';
import { Tabs, Modal } from 'antd';
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
  StyledTextArea,
  TextDiv,
} from './ProblemDetailPage.style';

const { TabPane } = Tabs;

const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [problemDetail, setProblemDetail] = useState<ProblemDetailInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        const response = await getProblemDetail(id!);
        setProblemDetail(response.result?.problemInfo || null);
      } catch (err) {
        setError('An error occurred while fetching problem info.');
      } finally {
        setLoading(false);
      }
    };

    fetchProblemDetail();
  }, [id]);

  const handleSubmit = async () => {
    if (answer.trim() === '') {
      alert('답변을 입력해주세요.');
      return;
    }

    try {
      const response = await solveProblem(id!, answer);
      console.log('API Response:', response);
      setResult(`Status: ${response.result?.problemResult?.status}`);
      setIsModalVisible(true);
    } catch (err) {
      setError('답변이 제출되지 않았습니다. 다시 시도해주세요.');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setResult(null);
  };

  const handleReset = () => {
    setAnswer('');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    // todo: 사이드바 사이즈 조절 가능허도록 수정 예정, 내 답변 기록 데이터 추가 예정 (API 필요), 스타일 수정 예정
    <ProblemDetailContainer>
      <ProblemInfoBar>
        <Title>{problemDetail && problemDetail.title}</Title>
        <Category>
          {problemDetail?.categoryName || '네트워크'} | {problemDetail?.topic || 'HTTP'}
        </Category>
        <ProblemInfo>난이도: {problemDetail?.level}</ProblemInfo>
        <ProblemInfo>완료한 사람: {problemDetail?.solved}명</ProblemInfo>
        <ProblemInfo>정답률: {problemDetail?.percentage}%</ProblemInfo>
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
                />
              </TextDiv>
            </TabPane>
            <TabPane tab="내 답변 기록" key="2">
              <div>내 답변 기록</div>
            </TabPane>
          </Tabs>
        </AnswerSection>
      </ContentContainer>
      <BottomBar>
        <CustomButton>질문하기</CustomButton>
        <CustomButton>다른 사람의 답변</CustomButton>
        <CustomButton onClick={handleReset}>답변 초기화</CustomButton>
        <CustomButton onClick={handleSubmit}>제출</CustomButton>
      </BottomBar>
      <Modal
        title="채점 결과"
        visible={isModalVisible}
        footer={[
          <CustomButton key="back" onClick={handleModalClose}>
            내 답변 보러가기
          </CustomButton>,
        ]}
        onCancel={handleModalClose}
      >
        <p>{result}</p>
      </Modal>
    </ProblemDetailContainer>
  );
};

export default ProblemDetailPage;
