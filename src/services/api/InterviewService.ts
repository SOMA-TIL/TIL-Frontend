import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { InterviewCode } from '@type/interview';

export interface InterviewCreateData {
  categoryIdList: number[];
}

export interface InterviewCodeData {
  interviewCode: InterviewCode;
}

export const createInterview = async (
  data: InterviewCreateData,
): Promise<ApiResponse<InterviewCodeData>> => {
  const response = await apiClient.post('/interview/create', data);
  return response.data;
};
