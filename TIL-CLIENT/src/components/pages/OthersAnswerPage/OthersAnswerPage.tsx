import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  LikeOutlined,
  QuestionCircleOutlined,
  ArrowLeftOutlined,
  LikeFilled,
} from '@ant-design/icons';
import BasicPageLayout from '@components/layout/BasicPageLayout';
import { getProblemDetail } from '@services/api/problemService';
import { ProblemDetailInfo } from '@type/problem';
import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_TYPE } from '@constants/toast';
import { getErrorMessage } from '@utils/errorHandler';
import useCategoryStore from '@store/useCategoryStore';
import {
  ButtonGroup,
  BottomBar,
  ProblemSolveFooterButton,
} from '../ProblemDetailPage/ProblemDetailPage.style';

import {
  OthersAnswerContainer,
  AnswerList,
  AnswerItem,
  UserInfo,
  UserName,
  Content,
  LikeButton,
  LikeCount,
  MainContentWrapper,
  TopSection,
  QuestionContent,
  AnswerListSection,
  TabMenu,
  TabMenuItem,
  QuestionTitle,
  Question,
} from './OthersAnswerPage.style';

interface Answer {
  id: number;
  userName: string;
  content: string;
  likes: number;
  isLiked: boolean;
}

const OthersAnswerPage: React.FC = () => {
  const [problemDetail, setProblemDetail] = useState<ProblemDetailInfo>({} as ProblemDetailInfo);
  const [activeTab, setActiveTab] = useState('others');
  const { notify } = useToast();
  const { id: problemId } = useParams<{ id: string }>();
  const { getCategoryList } = useCategoryStore();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<Answer[]>([
    {
      id: 1,
      userName: '닉셈프CPR',
      content:
        'Stateless : 서버가 클라이언트의 상태를 저장하지 않는다. 각각의 요청은 독립적이며, 이전 요청의 정보를 사용하지 않는다. 이는 서버의 확장성을 높이고 구현을 단순화한다.',
      likes: 10,
      isLiked: false,
    },
    {
      id: 2,
      userName: '개발왕',
      content:
        'Array는 연속된 메모리 공간에 데이터를 저장하므로 인덱스를 통한 접근이 O(1)로 매우 빠르지만, 삽입/삭제는 O(n)이 걸립니다. LinkedList는 반대로 삽입/삭제가 O(1)이지만 특정 요소 접근은 O(n)이 걸립니다.',
      likes: 8,
      isLiked: false,
    },
    {
      id: 3,
      userName: '알고리즘마스터',
      content:
        '메모리 관점에서 Array는 연속된 공간이 필요해서 큰 블록이 필요하지만, LinkedList는 분산된 메모리를 활용할 수 있어 메모리 활용이 유연합니다.',
      likes: 15,
      isLiked: false,
    },
    {
      id: 4,
      userName: '코딩고수',
      content:
        'Array는 크기가 고정되어 있어 확장이 필요할 때 새로운 배열을 만들어야 하지만, LinkedList는 동적으로 크기를 조절할 수 있습니다.',
      likes: 12,
      isLiked: false,
    },
    {
      id: 5,
      userName: '테크리더',
      content:
        '캐시 지역성 측면에서 Array가 LinkedList보다 유리합니다. Array는 연속된 메모리를 사용하므로 캐시 히트율이 높아 성능상 이점이 있습니다.',
      likes: 20,
      isLiked: false,
    },
  ]);

  useEffect(() => {
    const fetchProblemDetail = async () => {
      try {
        await getCategoryList();
        const response = await getProblemDetail(problemId!);
        setProblemDetail(response.result.problemInfo);
      } catch (err) {
        notify({
          message: '문제 정보 로딩 실패',
          description: getErrorMessage(err),
          type: TOAST_TYPE.ERROR,
        });
      }
    };

    fetchProblemDetail();
  }, [problemId, getCategoryList, notify]);

  const handleLikeClick = (id: number) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, isLiked: !answer.isLiked } : answer,
      ),
    );
  };

  const handleGoBack = () => {
    navigate(`/problem/${problemId}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'others':
        return (
          <AnswerList>
            {answers.map((answer) => (
              <AnswerItem key={answer.id}>
                <UserInfo>
                  <UserOutlined />
                  <UserName>{answer.userName}</UserName>
                </UserInfo>
                <Content>{answer.content}</Content>
                <LikeButton onClick={() => handleLikeClick(answer.id)} isLiked={answer.isLiked}>
                  {answer.isLiked ? <LikeFilled /> : <LikeOutlined />}
                  <LikeCount>{answer.likes}</LikeCount>
                </LikeButton>
              </AnswerItem>
            ))}
          </AnswerList>
        );
      case 'mine':
        return <div>내 답변 기록이 표시될 영역입니다.</div>;
      default:
        return null;
    }
  };

  return (
    <BasicPageLayout>
      <OthersAnswerContainer>
        <MainContentWrapper>
          <TopSection>
            <QuestionContent>
              <QuestionTitle>문제 설명</QuestionTitle>
              <Question>{problemDetail?.question}</Question>
            </QuestionContent>
          </TopSection>

          <AnswerListSection>
            <TabMenu>
              <TabMenuItem active={activeTab === 'others'} onClick={() => setActiveTab('others')}>
                다른 사람 답변
              </TabMenuItem>
              <TabMenuItem active={activeTab === 'mine'} onClick={() => setActiveTab('mine')}>
                내 답변 기록
              </TabMenuItem>
            </TabMenu>
            {renderContent()}
          </AnswerListSection>
        </MainContentWrapper>
      </OthersAnswerContainer>
      <BottomBar>
        <ButtonGroup>
          <ProblemSolveFooterButton type="" onClick={handleGoBack}>
            <ArrowLeftOutlined />
            문제 풀기로 돌아가기
          </ProblemSolveFooterButton>
          <ProblemSolveFooterButton type="">
            <QuestionCircleOutlined />
            질문하기
          </ProblemSolveFooterButton>
        </ButtonGroup>
      </BottomBar>
    </BasicPageLayout>
  );
};

export default OthersAnswerPage;
