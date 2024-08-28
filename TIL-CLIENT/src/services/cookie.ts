import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

import { LOCAL_PROFILE } from '@constants/env';

const cookies = new Cookies();

const defaultOptions: CookieSetOptions = {
  secure: import.meta.env.VITE_PROFILE !== LOCAL_PROFILE, // HTTPS 프로토콜에서만 전송
};

export const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
  cookies.set(name, value, { ...defaultOptions, ...options });
};

export const getCookie = (name: string) => cookies.get(name);

export const removeCookie = (name: string) => cookies.remove(name);
