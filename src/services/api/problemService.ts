import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { ProblemDetailInfo, ProblemOverviewInfo, ProblemSubmitHistoryInfo } from '@type/problem';

export interface ProblemListData {
  problemList: ProblemOverviewInfo[];
  pageInfo: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ProblemDetailData {
  problemInfo: ProblemDetailInfo;
}

export interface SolveProblemData {
  problemResult: {
    status: string;
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

export const toggleFavorite = async (id: number, isFavorite: boolean): Promise<ApiResponse> => {
  const response = await apiClient.post(`/problem/${id}/favorite`, { isFavorite });
  return response.data;
};

export const getProblemSubmitHistory = async (
  id: string,
): Promise<ApiResponse<ProblemSubmitHistoryInfo>> => {
  const response = await apiClient.get(`/problem/${id}/history`);
  return response.data;
};
