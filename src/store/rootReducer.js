import { combineReducers } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice'; // 예시 리듀서를 import

const rootReducer = combineReducers({
  example: exampleReducer,
});

export default rootReducer;
