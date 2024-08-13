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
  id: number;
  answer: string;
  feedback: string;
  score: string;
  created_date: string;
}
