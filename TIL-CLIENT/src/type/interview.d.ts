import { INTERVIEW_STATUS, INTERVIEW_PROBLEM_STATUS } from '@constants/interview';

export type InterviewStatus = (typeof INTERVIEW_STATUS)[keyof typeof INTERVIEW_STATUS];
export type InterviewProblemStatus =
  (typeof INTERVIEW_PROBLEM_STATUS)[keyof typeof INTERVIEW_PROBLEM_STATUS];

export interface InterviewCode {
  code: string;
}

export interface InterviewProblemInfo {
  answer: string;
  sequence: number;
  status: InterviewProblemStatus;
  question: string;
}
