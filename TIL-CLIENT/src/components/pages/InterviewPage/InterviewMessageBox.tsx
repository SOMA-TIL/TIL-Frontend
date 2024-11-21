import { useState } from 'react';
import { PauseCircleFilled, PlayCircleFilled } from '@ant-design/icons';
import {
  InterviewMessage,
  InterviewMessageBoxContainer,
  InterviewMessageProfile,
  InterviewMessageTime,
  TtsPlayButton,
} from './InterviewMessageBox.style';

interface InterviewMessageBoxProps {
  type: string;
  text: string;
  time: string;
}

const InterviewMessageBox: React.FC<InterviewMessageBoxProps> = ({ type, text, time }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      // 말하고 있는 경우 STOP
      speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // TTS 시작
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.3;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    speechSynthesis.speak(utterance);
  };

  return (
    <InterviewMessageBoxContainer type={type}>
      {type === 'interviewer' ? (
        <>
          <InterviewMessageProfile type={type}>
            <img src="/images/interviewer.png" alt="interviewer_img" />
            <p>면접관</p>
          </InterviewMessageProfile>
          <InterviewMessage type={type}>{text}</InterviewMessage>
          <TtsPlayButton onClick={handleSpeak}>
            {isSpeaking ? <PauseCircleFilled /> : <PlayCircleFilled />}
          </TtsPlayButton>
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
};

export default InterviewMessageBox;
