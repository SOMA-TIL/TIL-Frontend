import { GRADING_STATUS, GRADING_RESULT } from '@constants/grading';

export type GradingStatus = (typeof GRADING_STATUS)[keyof typeof GRADING_STATUS];
export type GradingResultType = (typeof GRADING_RESULT)[keyof typeof GRADING_RESULT];

export interface GradingResult {
  status: GradingStatus;
  result: GradingResultType;
  comment: string;
}

export interface GradingResultWithProblemInfo {
  question: string;
  userAnswer: string;
  result: GradingResultType;
  comment: string;
}
