import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

const storeSupport = <T>(initializer: StateCreator<T>, storeName: string) =>
  process.env.REACT_APP_PROFILE === 'prod'
    ? create<T>()(initializer)
    : create<T>()(devtools(initializer, { name: storeName }));

export default storeSupport;
