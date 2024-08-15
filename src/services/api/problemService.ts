import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { ProblemDetailInfo, ProblemOverviewInfo, ProblemSubmitHistoryInfo } from '@type/problem';
import qs from 'qs';

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

export interface ProblemListParams {
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  keyword?: string;
  status?: string; // todo: 사용자 정보 받아오기
  level?: number;
  categoryList?: string[];
}

export const getProblemList = async (
  params: ProblemListParams = {},
): Promise<ApiResponse<ProblemListData>> => {
  const response = await apiClient.get('/problem', {
    params,
    paramsSerializer: (queryParams) => qs.stringify(queryParams, { arrayFormat: 'repeat' }),
  });
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
