import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { Category } from '@type/category';
import { InterviewCode } from '@type/interview';

export interface InterviewCreateData {
  categoryIdList: number[];
}

export interface InterviewCodeData {
  interviewCode: InterviewCode;
}

export interface InterviewInfoData {
  categoryList: Category[];
}

export const createInterview = async (
  data: InterviewCreateData,
): Promise<ApiResponse<InterviewCodeData>> => {
  const response = await apiClient.post('/interview/create', data);
  return response.data;
};

export const getInterviewInfo = async (code: string): Promise<ApiResponse<InterviewInfoData>> => {
  const response = await apiClient.get(`/interview/${code}`);
  return response.data;
};
