import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AccessTokenInfo {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  getAccessToken: () => string;
  deleteTokens: () => void;
}

const useAuthStore = create<AccessTokenInfo>()(
  devtools((set, get) => ({
    accessToken: '',
    setAccessToken: (accessToken) => set({ accessToken }),
    getAccessToken: () => get().accessToken,
    deleteTokens: () => set({ accessToken: '' }),
  })),
);

export default useAuthStore;
