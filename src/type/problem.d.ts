export interface ProblemListInfo {
  id: number;
  title: string;
  level: number;
  solved: number;
  percentage: number;
  categoryName: string | null;
  topic: string | null;
}

export interface ProblemDetailInfo {
  id: number;
  title: string;
  question: string;
  solution: string;
  point: number;
  level: number;
  solved: number;
  percentage: number;
  categoryName: string | null;
  topic: string | null;
}
