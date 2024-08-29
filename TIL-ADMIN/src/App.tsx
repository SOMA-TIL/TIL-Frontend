import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { ToastProvider } from '@components/common/notification/ToastProvider';
import MainPage from '@components/pages/MainPage/MainPage';
import GlobalStyle from '@styles/GlobalStyle';
import PrivateRoute from './route';

const App: React.FC = () => (
  <ToastProvider>
    <GlobalStyle />
    <Routes>
      {/* 인증 여부 상관 없이 접속 가능한 페이지 정의 */}
      <Route path="/" element={<MainPage />} />
      {/* 인증이 필요한 페이지 정의 */}
      <Route element={<PrivateRoute />}>{/* TODO */}</Route>
      {/* 인증을 하지 않아야만 접속 가능한 페이지 정의 */}
      <Route element={<PrivateRoute authentication={false} />}>{/* TODO */}</Route>
    </Routes>
  </ToastProvider>
);

export default App;
