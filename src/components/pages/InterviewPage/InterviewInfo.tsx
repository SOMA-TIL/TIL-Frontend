import {
  InterviewInfoCategory,
  InterviewInfoContainer,
  InterviewInfoDescription,
  InterviewInfoTitle,
} from './InterviewInfo.style';

const InterviewInfo: React.FC = () => (
  <InterviewInfoContainer>
    <InterviewInfoTitle>[0000.00.00(수)] 모의 면접 </InterviewInfoTitle>
    <InterviewInfoCategory>네트워크</InterviewInfoCategory>
    <InterviewInfoCategory>HTTP</InterviewInfoCategory>
    <InterviewInfoDescription>면접 ID: abcd1234</InterviewInfoDescription>
  </InterviewInfoContainer>
);
export default InterviewInfo;
