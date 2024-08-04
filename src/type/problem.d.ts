export interface ProblemListInfo {
  id: number;
  title: string;
  level: number;
  solved: number;
  percentage: number;
  categoryName: string | null;
  topic: string | null;
}
