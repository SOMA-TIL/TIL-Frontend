import apiClient from './axios';

export interface JoinData {
  email: string;
  password: string;
  nickname: string;
}

export const join = async (data: JoinData) => {
  const response = await apiClient.post('/user/join', data);
  return response.data;
};
