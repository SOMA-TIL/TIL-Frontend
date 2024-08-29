import storeSupport from '@store/support';

interface Loading {
  isLoading: boolean;
  getIsLoading: () => boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const useLoadingStore = storeSupport<Loading>(
  (set, get) => ({
    isLoading: false,
    getIsLoading: () => get().isLoading,
    setIsLoading: (isLoading) => set({ isLoading }),
  }),
  'LOADING_STORE',
);

export default useLoadingStore;
