export interface ProblemOverviewInfo {
  id: number;
  title: string;
  level: number;
  categoryList: number[];
}

export interface ProblemDetailInfo {
  id: number;
  title: string;
  question: string;
  level: number;
  categoryList: number[];
  isFavorite: boolean;
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
