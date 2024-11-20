/* eslint-disable */
import { formatBearerToken, REFRESH_TOKEN } from '@constants/auth';
import { getCookie, removeCookie, setCookie } from '@services/cookie';
import useAuthStore from '@store/useAuthStore';
import { ApiResponse } from '@type/api';
import { Token } from '@type/auth';
import axios, { AxiosResponse } from 'axios';

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_TIL_API_URL, // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 : 요청을 보내기 전에 토큰을 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const newConfig = { ...config };
    const accessToken = useAuthStore.getState().getAccessToken();
    if (accessToken) {
      newConfig.headers.Authorization = formatBearerToken(accessToken); // 헤더에 토큰 추가
    }
    // newConfig.headers['X-USER-ID'] = 2;

    return newConfig;
  },
  (error) => Promise.reject(error), // 요청 중 에러가 발생하면 거부
);

let isRefreshing = false; // 토큰 갱신 중인지 여부를 나타내는 플래그
let failedQueue: any[] = []; // 요청이 실패한 후 대기 중인 요청들을 저장하는 큐

// 실패한 요청들을 처리하는 함수
const processQueue = (error: Error | unknown, accessToken: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error); // 에러 발생 시, 대기 중인 요청을 모두 거부
    } else {
      prom.resolve(accessToken); // 성공 시, 대기 중인 요청에 새로운 토큰으로 재시도
    }
  });
  failedQueue = [];
};

// 응답 인터셉터 : 응답이 돌아오면 처리
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response, // 응답이 성공적이면 그대로 반환
  async (error) => {
    const originalRequest = error.config; // 실패한 요청 정보를 가져옴

    // 인터셉터를 건너뛰기 위한 조건
    if (originalRequest.skipInterceptor) {
      return Promise.reject(error); // 요청이 인터셉터를 건너뛰도록 설정된 경우 에러 반환
    }

    // 401 Unauthorized 에러가 발생하고, 아직 재시도를 하지 않은 경우
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정

      if (isRefreshing) {
        // 이미 토큰 갱신 중인 경우
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject }); // 대기 중인 요청에 추가
        })
          .then((token) => {
            originalRequest.headers.Authorization = formatBearerToken(token as string); // 새로운 토큰으로 헤더 업데이트
            return apiClient(originalRequest); // 요청을 다시 시도
          })
          .catch((err) => Promise.reject(err)); // 에러 발생 시 거부
      }

      isRefreshing = true; // 토큰 갱신 시작

      // 토큰 갱신 시도
      return new Promise((resolve, reject) => {
        refreshToken()
          .then((response) => {
            const { token } = response.result as { token: Token };

            useAuthStore.getState().setAccessToken(token.accessToken);
            setCookie(REFRESH_TOKEN, token.refreshToken);

            apiClient.defaults.headers.common.Authorization = formatBearerToken(token.accessToken); // 기본 헤더 업데이트
            originalRequest.headers.Authorization = formatBearerToken(token.accessToken); // 요청 헤더 업데이트
            processQueue(null, token.accessToken); // 대기 중인 요청 처리
            resolve(apiClient(originalRequest)); // 원래 요청 재시도
          })
          .catch((err) => {
            removeCookie(REFRESH_TOKEN);
            processQueue(err, null); // 에러 발생 시 대기 중인 요청 모두 거부
            reject(err); // 에러 반환
          })
          .finally(() => {
            isRefreshing = false; // 토큰 갱신 종료
          });
      });
    }

    return Promise.reject(error); // 401 이외의 에러는 그대로 거부
  },
);

// 리프레시 토큰을 사용해 새로운 액세스 토큰을 요청하는 함수
const refreshToken = async (): Promise<ApiResponse> => {
  try {
    const refreshToken = getCookie(REFRESH_TOKEN);
    const response = await axios.get(`${import.meta.env.VITE_TIL_API_URL}/auth/reissue`, {
      headers: {
        Authorization: formatBearerToken(refreshToken),
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error; // 에러 발생 시 예외를 던짐
  }
};

export default apiClient;
