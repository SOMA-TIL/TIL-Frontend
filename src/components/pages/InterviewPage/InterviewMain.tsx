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
}

const InterviewMain: React.FC<InterviewMainProps> = ({
  solvedProblemList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unSolvedProblemList,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentSequence,
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
          <div ref={scrollRef} />
        </InterviewMessageContainer>
        <InterviewInputContainer>
          <InterviewInputTextArea placeholder="답변을 입력하세요." />
        </InterviewInputContainer>
      </InterviewContentContainer>
    </InterviewMainContainer>
  );
};

export default InterviewMain;
