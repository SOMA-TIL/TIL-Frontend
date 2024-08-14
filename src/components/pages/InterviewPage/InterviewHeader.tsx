import {
  InterviewHeaderButton,
  InterviewHeaderContainer,
  InterviewHeaderLogo,
} from './InterviewHeader.style';

const InterviewHeader: React.FC = () => (
  <InterviewHeaderContainer>
    <InterviewHeaderLogo>
      <img src="/images/TIL_logo.png" alt="TIL_logo" />
    </InterviewHeaderLogo>
    <InterviewHeaderButton>면접 종료하기</InterviewHeaderButton>
  </InterviewHeaderContainer>
);

export default InterviewHeader;
