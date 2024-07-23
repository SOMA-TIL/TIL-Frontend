import storeSupport from '@store/support';

interface AccessTokenInfo {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  getAccessToken: () => string;
  deleteTokens: () => void;
}

const useAuthStore = storeSupport<AccessTokenInfo>(
  (set, get) => ({
    accessToken: '',
    setAccessToken: (accessToken) => set({ accessToken }),
    getAccessToken: () => get().accessToken,
    deleteTokens: () => set({ accessToken: '' }),
  }),
  'AUTH_STORE',
);

export default useAuthStore;
