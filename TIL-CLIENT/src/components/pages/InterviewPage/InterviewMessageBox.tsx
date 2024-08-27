import {
  InterviewMessage,
  InterviewMessageBoxContainer,
  InterviewMessageProfile,
  InterviewMessageTime,
} from './InterviewMessageBox.style';

interface InterviewMessageBoxProps {
  type: string;
  text: string;
  time: string;
}

const InterviewMessageBox: React.FC<InterviewMessageBoxProps> = ({ type, text, time }) => (
  <InterviewMessageBoxContainer type={type}>
    {type === 'interviewer' ? (
      <>
        <InterviewMessageProfile type={type}>
          <img src="/images/interviewer.png" alt="interviewer_img" />
          <p>면접관</p>
        </InterviewMessageProfile>
        <InterviewMessage type={type}>{text}</InterviewMessage>
        <InterviewMessageTime type={type}>{time}</InterviewMessageTime>
      </>
    ) : (
      <>
        <InterviewMessageTime type={type}>{time}</InterviewMessageTime>
        <InterviewMessage type={type}>{text}</InterviewMessage>
        <InterviewMessageProfile type={type}>
          <img src="/images/interviewee.png" alt="interviewee_img" />
          <p>나</p>
        </InterviewMessageProfile>
      </>
    )}
  </InterviewMessageBoxContainer>
);

export default InterviewMessageBox;
