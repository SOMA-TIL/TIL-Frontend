import 'axios';

export interface Status {
  code: string;
  message: string;
}

export interface ApiResponse<T = unknown> {
  status: Status;
  result?: T;
}

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipInterceptor?: boolean;
  }
}
