import {
  InterviewFooterButton,
  InterviewFooterContainer,
  InterviewFooterDescription,
} from './InterviewFooter.style';

const InterviewFooter: React.FC = () => (
  <InterviewFooterContainer>
    <InterviewFooterDescription>🛈 답변 남은시간: 2분 59초</InterviewFooterDescription>
    <InterviewFooterButton type="">Skip&nbsp;&nbsp;{'>'}</InterviewFooterButton>
    <InterviewFooterButton type="RED">🗘&nbsp;&nbsp;답변 초기화</InterviewFooterButton>
    <InterviewFooterButton type="PURPLE">🗸&nbsp;&nbsp;답변 제출</InterviewFooterButton>
  </InterviewFooterContainer>
);

export default InterviewFooter;
