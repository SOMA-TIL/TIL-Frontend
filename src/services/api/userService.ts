import apiClient from './axios';
import { ApiResponse } from '../../types/api';

export interface JoinData {
  email: string;
  password: string;
  nickname: string;
}

export const join = async (data: JoinData) => {
  const response = await apiClient.post('/user/join', data);
  return response.data;
};

export interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData): Promise<ApiResponse> => {
  const response = await apiClient.post('/user/login', data);
  return response.data;
};
