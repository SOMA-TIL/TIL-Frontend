import apiClient from '@services/api/axios';
import { ApiResponse } from '@type/api';
import { GradingResultWithProblemInfo } from '@type/grading';
import { InterviewCode, InterviewProblemInfo, InterviewStatus } from '@type/interview';

export interface InterviewCreateData {
  categoryIdList: number[];
}

export interface InterviewCodeData {
  interviewCode: InterviewCode;
}

export interface InterviewInfoData {
  createdDate: string;
  categoryIdList: number[];
  problemList: InterviewProblemInfo[];
}

export interface InterviewProblemSolveData {
  sequence: number;
  answer: string;
}

export interface InterviewStatusData {
  status: InterviewStatus;
}

export interface InterviewResultData {
  interviewStatus: InterviewStatus;
  gradingResult?: GradingResultWithProblemInfo[];
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

export const solveInterviewProblem = async (
  code: string,
  data: InterviewProblemSolveData,
): Promise<ApiResponse> => {
  const response = await apiClient.patch(`/interview/${code}/solve`, data);
  return response.data;
};

export const submitInterview = async (code: string): Promise<ApiResponse> => {
  const response = await apiClient.post(`/interview/${code}/submit`);
  return response.data;
};

export const getIntreviewStatus = async (
  code: string,
): Promise<ApiResponse<InterviewStatusData>> => {
  const response = await apiClient.get(`/interview/${code}/status`);
  return response.data;
};

export const getInterviewResult = async (
  code: string,
): Promise<ApiResponse<InterviewResultData>> => {
  const response = await apiClient.get(`/interview/${code}/result`);
  return response.data;
};
