import { BLACK, GREEN, RED2 } from '@styles/pallete';

export const GRADING_STATUS = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  ERROR: 'ERROR',
};

export const GRADING_RESULT = {
  PASS: 'PASS',
  FAIL: 'FAIL',
};

export const getGradingResultColor = (result: string | undefined) => {
  switch (result) {
    case GRADING_RESULT.PASS:
      return GREEN;
    case GRADING_RESULT.FAIL:
      return RED2;
    default:
      return BLACK;
  }
};
