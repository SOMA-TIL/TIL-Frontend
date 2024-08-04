import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { ProblemListInfo, ProblemDetailInfo } from '@type/problem';

export interface ProblemListData {
  items: ProblemListInfo[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface ProblemDetailData {
  problemInfo: ProblemDetailInfo;
}

export interface SolveProblemData {
  problemResult: {
    status: string;
    solution: string;
  };
}

export const getProblemList = async (): Promise<ApiResponse<ProblemListData>> => {
  const response = await apiClient.get('/problem');
  return response.data;
};

export const getProblemDetail = async (id: string): Promise<ApiResponse<ProblemDetailData>> => {
  const response = await apiClient.get(`/problem/${id}`);
  return response.data;
};

export const solveProblem = async (
  id: string,
  answer: string,
): Promise<ApiResponse<SolveProblemData>> => {
  const response = await apiClient.post(`/problem/${id}/solve`, { answer });
  return response.data;
};
