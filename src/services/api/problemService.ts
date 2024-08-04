import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { ProblemListInfo } from '@type/problem';

export interface ProblemListData {
  items: ProblemListInfo[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export const getProblemList = async (): Promise<ApiResponse<ProblemListData>> => {
  const response = await apiClient.get('/problem');
  return response.data;
};
