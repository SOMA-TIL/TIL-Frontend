import useAuthStore from '@store/useAuthStore';
import useUserInfoStore from '@store/useUserInfoStore';

export const logoutClearStores = () => {
  useAuthStore.getState().reset();
  useUserInfoStore.getState().reset();
};

export const clearStores = () => {
  // TODO: 모든 스토어 초기화
};
