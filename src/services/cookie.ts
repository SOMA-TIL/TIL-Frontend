import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

const defaultOptions: CookieSetOptions = {
  secure: process.env.REACT_APP_PROFILE !== 'local', // HTTPS 프로토콜에서만 전송
};

export const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
  cookies.set(name, value, { ...defaultOptions, ...options });
};

export const getCookie = (name: string) => cookies.get(name);

export const removeCookie = (name: string) => cookies.remove(name);
