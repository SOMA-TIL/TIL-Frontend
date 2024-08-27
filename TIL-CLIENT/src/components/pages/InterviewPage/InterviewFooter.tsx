import { DoubleRightOutlined, FileDoneOutlined, RedoOutlined } from '@ant-design/icons';
import {
  InterviewFooterButton,
  InterviewFooterContainer,
  InterviewFooterDescription,
} from './InterviewFooter.style';

interface InterviewFooterProps {
  skipEvent: React.MouseEventHandler;
  refreshEvent: React.MouseEventHandler;
  submitEvent: React.MouseEventHandler;
}

const InterviewFooter: React.FC<InterviewFooterProps> = ({
  skipEvent,
  refreshEvent,
  submitEvent,
}) => (
  <InterviewFooterContainer>
    <InterviewFooterDescription>
      {/* <ClockCircleOutlined />  답변 남은시간: 2분 59초 */}
    </InterviewFooterDescription>
    <InterviewFooterButton type="" onClick={skipEvent}>
      Skip <DoubleRightOutlined />
    </InterviewFooterButton>
    <InterviewFooterButton type="RED" onClick={refreshEvent}>
      <RedoOutlined /> 답변 초기화
    </InterviewFooterButton>
    <InterviewFooterButton type="PURPLE" onClick={submitEvent}>
      <FileDoneOutlined /> 답변 제출
    </InterviewFooterButton>
  </InterviewFooterContainer>
);

export default InterviewFooter;
