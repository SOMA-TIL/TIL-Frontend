import { REFRESH_TOKEN } from '@constants/auth';
import { getCookie, removeCookie, setCookie } from '@services/cookie';
import storeSupport from '@store/support';
import { Token } from '@type/auth';

interface AccessTokenInfo {
  isAuthenticated: boolean;
  checkAuthentication: () => void;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  getAccessToken: () => string;
  deleteAccessToken: () => void;
  login: (token: Token) => void;
  logout: () => void;
}

const useAuthStore = storeSupport<AccessTokenInfo>(
  (set, get) => ({
    accessToken: '',
    setAccessToken: (accessToken) => set({ accessToken }),
    getAccessToken: () => get().accessToken,
    deleteAccessToken: () => set({ accessToken: '' }),
    isAuthenticated: Boolean(getCookie(REFRESH_TOKEN)),
    checkAuthentication: () => {
      set({ isAuthenticated: Boolean(getCookie(REFRESH_TOKEN)) });
    },
    login: (token) => {
      setCookie(REFRESH_TOKEN, token.refreshToken);
      get().setAccessToken(token.accessToken);
      set({ isAuthenticated: true });
    },
    logout: () => {
      removeCookie(REFRESH_TOKEN);
      get().deleteAccessToken();
      set({ isAuthenticated: false });
    },
  }),
  'AUTH_STORE',
);

export default useAuthStore;
