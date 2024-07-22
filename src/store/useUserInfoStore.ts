import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserInfo {
  nickname: string;
  setNickname: (nickname: string) => void;
  getNickname: () => string;
}

const useUserInfoStore = create<UserInfo>()(
  devtools((set, get) => ({
    nickname: '',
    setNickname: (nickname) => set({ nickname }),
    getNickname: () => get().nickname,
  })),
);

export default useUserInfoStore;
