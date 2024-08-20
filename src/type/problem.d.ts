export interface UserStatus {
  isFavorite: boolean;
  isAttempted: boolean;
  isPassed: boolean;
}

export interface ProblemOverviewInfo {
  id: number;
  title: string;
  level: number;
  categoryList: number[];
  finishCount: number;
  passRate: number;
  userStatus: UserStatus;
}

export interface ProblemDetailInfo {
  id: number;
  title: string;
  question: string;
  level: number;
  categoryList: number[];
  isFavorite: boolean;
  finishCount: number;
  passRate: number;
}

export interface ProblemHistoryInfo {
  submitId: number;
  answer: string;
  result: string;
  comment: string;
  submittedDate: string;
}

export interface ProblemSubmitHistoryInfo {
  submitHistory: ProblemHistoryInfo[];
  solution: string;
}
