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
}
