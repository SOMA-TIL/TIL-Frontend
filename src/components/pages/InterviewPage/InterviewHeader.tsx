import {
  InterviewHeaderButton,
  InterviewHeaderContainer,
  InterviewHeaderLogo,
} from './InterviewHeader.style';

interface InterviewHeaderProps {
  handleInterviewSubmit: React.MouseEventHandler;
}

const InterviewHeader: React.FC<InterviewHeaderProps> = ({ handleInterviewSubmit }) => (
  <InterviewHeaderContainer>
    <InterviewHeaderLogo>
      <img src="/images/TIL_logo.png" alt="TIL_logo" />
    </InterviewHeaderLogo>
    <InterviewHeaderButton onClick={handleInterviewSubmit}>면접 종료하기</InterviewHeaderButton>
  </InterviewHeaderContainer>
);

export default InterviewHeader;
