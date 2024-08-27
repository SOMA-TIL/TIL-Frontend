import storeSupport from '@store/support';

interface UserInfo {
  nickname: string;
  setNickname: (nickname: string) => void;
  getNickname: () => string;
  reset: () => void;
}

const useUserInfoStore = storeSupport<UserInfo>(
  (set, get) => ({
    nickname: '',
    setNickname: (nickname) => set({ nickname }),
    getNickname: () => get().nickname,
    reset: () => set({ nickname: '' }),
  }),
  'USER_INFO_STORE',
);

export default useUserInfoStore;
