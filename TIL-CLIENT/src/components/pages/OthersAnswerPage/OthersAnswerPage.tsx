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
import { getProblemDetail, OthersAnswer } from '@services/api/problemService';
import { ProblemDetailInfo } from '@type/problem';
import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_TYPE } from '@constants/toast';
import { getErrorMessage } from '@utils/errorHandler';
import useCategoryStore from '@store/useCategoryStore';
import apiClient from '@services/api/axios';
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
  EmptyMessage,
} from './OthersAnswerPage.style';

const OthersAnswerPage: React.FC = () => {
  const [problemDetail, setProblemDetail] = useState<ProblemDetailInfo>({} as ProblemDetailInfo);
  const { notify } = useToast();
  const { id: problemId } = useParams<{ id: string }>();
  const { getCategoryList } = useCategoryStore();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<OthersAnswer[]>([]);
  const [likedAnswers, setLikedAnswers] = useState<{ [key: number]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});

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

  useEffect(() => {
    const fetchOthersAnswers = async () => {
      try {
        const response = await apiClient.get(`/problem/${problemId}/othersAnswer`);
        const { answerList } = response.data.result;

        const answersWithRandomLikes: OthersAnswer[] = answerList
          .map((answer: OthersAnswer) => ({
            ...answer,
            initialLikes: Math.floor(Math.random() * 10) + 1,
          }))
          .sort(
            (a: OthersAnswer, b: OthersAnswer) => (b.initialLikes || 0) - (a.initialLikes || 0),
          );

        setAnswers(answersWithRandomLikes);

        const initialLikeCounts = answersWithRandomLikes.reduce(
          (acc: { [key: number]: number }, answer: OthersAnswer) => ({
            ...acc,
            [answer.solvedId]: answer.initialLikes || 0,
          }),
          {},
        );
        setLikeCounts(initialLikeCounts);
      } catch (error) {
        notify({
          message: '다른 사람 답변 로딩 실패',
          description: getErrorMessage(error),
          type: TOAST_TYPE.ERROR,
        });
      }
    };

    fetchOthersAnswers();
  }, [problemId, notify]);

  const handleLikeClick = (solvedId: number) => {
    setLikedAnswers((prev) => ({
      ...prev,
      [solvedId]: !prev[solvedId],
    }));

    setLikeCounts((prev) => ({
      ...prev,
      [solvedId]: prev[solvedId] + (likedAnswers[solvedId] ? -1 : 1),
    }));
  };

  const handleGoBack = () => {
    navigate(`/problem/${problemId}`);
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
              <TabMenuItem>다른 사람 답변</TabMenuItem>
            </TabMenu>
            <AnswerList>
              {answers.length > 0 ? (
                answers.map((answer) => (
                  <AnswerItem key={answer.solvedId}>
                    <UserInfo>
                      <UserOutlined />
                      <UserName>{answer.nickname}</UserName>
                    </UserInfo>
                    <Content>{answer.answer}</Content>
                    <LikeButton
                      onClick={() => handleLikeClick(answer.solvedId)}
                      isLiked={likedAnswers[answer.solvedId]}
                    >
                      {likedAnswers[answer.solvedId] ? <LikeFilled /> : <LikeOutlined />}
                      <LikeCount>{likeCounts[answer.solvedId] || 0}</LikeCount>
                    </LikeButton>
                  </AnswerItem>
                ))
              ) : (
                <EmptyMessage>다른 사람 풀이가 없습니다.</EmptyMessage>
              )}
            </AnswerList>
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
