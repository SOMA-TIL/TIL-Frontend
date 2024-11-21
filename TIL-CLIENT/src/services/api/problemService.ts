import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { GradingResult } from '@type/grading';
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

export interface SubmitInfo {
  submitId: number;
  status: string;
}

export interface SubmitProblemData {
  submitInfo: SubmitInfo;
}

export interface SubmitGradingResult {
  gradingResult: GradingResult;
}

export interface OthersAnswer {
  solvedId: number;
  problemId: number;
  nickname: string;
  answer: string;
  initialLikes?: number;
}

interface OthersAnswerResponse {
  answerList: OthersAnswer[];
  pageInfo: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export interface ProblemListParams {
  page?: number;
  size?: number;
  sort?: string;
  order?: string;
  keyword?: string;
  status?: string;
  levelList?: number[];
  categoryList?: number[];
  isFavorite?: boolean;
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

export const submitProblem = async (
  id: string,
  answer: string,
): Promise<ApiResponse<SubmitProblemData>> => {
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

export const getSubmitResult = async (
  id: string,
  submitId: number,
): Promise<ApiResponse<SubmitGradingResult>> => {
  const response = await apiClient.get(`/problem/${id}/result?submitId=${submitId}`);
  return response.data;
};

export const getOthersAnswers = async (id: string): Promise<ApiResponse<OthersAnswerResponse>> => {
  const response = await apiClient.get(`/problem/${id}/othersAnswer`);
  return response.data;
};
