import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

const defaultOptions: CookieSetOptions = {
  httpOnly: true, // 클라이언트 측 자바스크립트에서 접근 불가
  secure: true, // HTTPS 프로토콜에서만 전송
};

export const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
  cookies.set(name, value, { ...defaultOptions, ...options });
};

export const getCookie = (name: string) => cookies.get(name);
