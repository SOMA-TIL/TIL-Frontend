import {
  InterviewMainContainer,
  InterviewContentContainer,
  InterviewMessageContainer,
  InterviewInputContainer,
  InterviewInputTextArea,
} from './InterviewMain.style';
import InterviewMessageBox from './InterviewMessageBox';

const InterviewMain: React.FC = () => (
  <InterviewMainContainer>
    <InterviewContentContainer>
      <InterviewMessageContainer>
        <InterviewMessageBox
          type="interviewer"
          text="CORS(Cross-Origin Resource Sharing)란 개념과 동작원리에 대해 설명해주세요"
          time="00:00"
        />
        <InterviewMessageBox
          type="interviewee"
          text="브라우저에서는 보안적인 이유로 cross-origin HTTP 요청들을 제한합니다. 그래서 cross-origin 요청을 하려면 서버의 동의가 필요합니다. 만약 서버가 동의한다면 브라우저에서는 요청을 허락하고, 동의하지 않는다면 브라우저에서 거절합니다.
이러한 허락을 구하고 거절하는 메커니즘을 HTTP-header를 이용해서 가능한데, 이를 CORS(Cross-Origin Resource Sharing)라고 부릅니다. 그래서 브라우저에서 cross-origin 요청을 안전하게 할 수 있도록 하는 메커니즘입니다.&nbsp;&nbsp;
브라우저의 CORS 동작원리
1. 브라우저는 요청 헤더에 Origin이라는 필드에 본인 출처를 넣어서 보낸다.(cookie를 사용하는 보안과 관련된 것은 credentials 헤더를 true로 보내줘야 한다.)


2. 서버는 응답 헤더에 Access-Control-Allow-Origin에 본인이 허용하는 출처를 담아서 응답하게 된다.(cookie와 같은 보안과 관련된 것은 Access-Control-Allow-Credentials를 true로 응답해야 한다.)
&nbsp;
3. 브라우저는 Origin과 Access-Control-Allow-Origin을 비교하고, 맞는지 틀린지 검사만 한다.
&nbsp;
4. 맞으면 그대로 응답을 사용하고, 틀리다면 에러를 뱉고 응답을 버린다."
          time="00:00"
        />
        <InterviewMessageBox
          type="interviewer"
          text="비관적 락과 낙관적 락의 개념과 특징, 사용 사례에 대해 설명하세요."
          time="00:00"
        />
        <InterviewMessageBox type="interviewee" text="잘 모르겠어요." time="00:00" />
      </InterviewMessageContainer>
      <InterviewInputContainer>
        <InterviewInputTextArea placeholder="답변을 입력하세요." />
      </InterviewInputContainer>
    </InterviewContentContainer>
  </InterviewMainContainer>
);

export default InterviewMain;
