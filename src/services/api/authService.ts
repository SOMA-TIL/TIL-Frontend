/* eslint-disable */
import { formatBearerToken, REFRESH_TOKEN } from '@constants/auth';
import apiClient from '@services/api/axios';
import { getCookie } from '@services/cookie';
import useAuthStore from '@store/useAuthStore';
import { ApiResponse } from '@type/api';
import { Token } from '@type/auth';

export const reissueToken = async (): Promise<ApiResponse> => {
  const refreshToken = getCookie(REFRESH_TOKEN);
  if (!refreshToken) {
    console.error('Refresh token is missing or invalid.');
    throw new Error('Refresh token is missing.');
  }

  const response = await apiClient.get('/auth/reissue', {
    skipInterceptor: true,
    headers: {
      Authorization: formatBearerToken(refreshToken),
      'Content-Type': 'application/json',
    },
  });

  if (!response || !response.data) {
    console.error('Failed to reissue token:', response);
    throw new Error('Failed to reissue token.');
  }

  return response.data;
};

export const initialSettingTokens = async (): Promise<void> => {
  try {
    const response = await reissueToken();
    const { token } = response.result as { token: Token };
    useAuthStore.getState().setTokens(token);
  } catch (error) {
    console.error('Failed to set initial tokens:', error);
    useAuthStore.getState().clearTokens();
  }
};
