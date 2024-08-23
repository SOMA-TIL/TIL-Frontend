import { InterviewProblemInfo } from '@type/interview';
import { useEffect, useRef } from 'react';
import {
  InterviewMainContainer,
  InterviewContentContainer,
  InterviewMessageContainer,
  InterviewInputContainer,
  InterviewInputTextArea,
} from './InterviewMain.style';
import InterviewMessageBox from './InterviewMessageBox';

interface InterviewMainProps {
  solvedProblemList: InterviewProblemInfo[];
  unSolvedProblemList: InterviewProblemInfo[];
  currentSequence: number;
  currentAnswer: string;
  handleTextArea: React.ChangeEventHandler;
}

const InterviewMain: React.FC<InterviewMainProps> = ({
  solvedProblemList,
  unSolvedProblemList,
  currentSequence,
  currentAnswer,
  handleTextArea,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [unSolvedProblemList]);

  return (
    <InterviewMainContainer>
      <InterviewContentContainer>
        <InterviewMessageContainer>
          {solvedProblemList.map((problem) => (
            <>
              <InterviewMessageBox type="interviewer" text={problem.question} time="" />
              <InterviewMessageBox type="interviewee" text={problem.answer} time="" />
            </>
          ))}
          {unSolvedProblemList.map((problem) =>
            problem.sequence === currentSequence ? (
              <InterviewMessageBox type="interviewer" text={problem.question} time="" />
            ) : (
              ''
            ),
          )}
          {unSolvedProblemList.length === 0 ? (
            <InterviewMessageBox
              type="interviewer"
              text="모든 면접 문제를 풀었습니다. 우측 상단의 면접 종료 버튼을 클릭해주세요."
              time=""
            />
          ) : (
            ''
          )}
          <div ref={scrollRef} />
        </InterviewMessageContainer>
        <InterviewInputContainer>
          <InterviewInputTextArea
            value={currentAnswer}
            placeholder="답변을 입력하세요."
            onChange={handleTextArea}
          />
        </InterviewInputContainer>
      </InterviewContentContainer>
    </InterviewMainContainer>
  );
};

export default InterviewMain;
