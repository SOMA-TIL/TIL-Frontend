import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { PROD_PROFILE } from '@constants/env';

const storeSupport = <T>(initializer: StateCreator<T>, storeName: string) =>
  process.env.REACT_APP_PROFILE === PROD_PROFILE
    ? create<T>()(initializer)
    : create<T>()(devtools(initializer, { name: storeName }));

export default storeSupport;
