export interface ProblemListInfo {
  id: number;
  title: string;
  level: number;
  categoryList: Category[];
}

export interface ProblemDetailInfo {
  id: number;
  title: string;
  question: string;
  solution: string;
  grading: string;
  level: number;
  categoryList: Category[];
  isFavorite: boolean;
}

export interface ProblemHistoryInfo {
  id: number;
  answer: string;
  feedback: string;
  score: string;
  created_date: string;
}
