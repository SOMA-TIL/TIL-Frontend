import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { InterviewUuid } from '@type/interview';

export interface InterviewCreateData {
  categoryIdList: number[];
}

export interface InterviewUuidData {
  interviewUuid: InterviewUuid;
}

export const createInterview = async (
  data: InterviewCreateData,
): Promise<ApiResponse<InterviewUuidData>> => {
  const response = await apiClient.post('/interview/create', data);
  return response.data;
};
