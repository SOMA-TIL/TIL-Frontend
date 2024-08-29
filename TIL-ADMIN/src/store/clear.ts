import useAuthStore from '@store/useAuthStore';

export const logoutClearStores = () => {
  useAuthStore.getState().clearTokens();
};

export const clearStores = () => {
  // TODO: 모든 스토어 초기화
};
