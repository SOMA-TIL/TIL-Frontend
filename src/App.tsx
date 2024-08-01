import React from 'react';
import { Route, Routes } from 'react-router-dom';

import BasicPageLayout from '@components/layout/BasicPageLayout';
import MainPage from '@components/pages/MainPage/MainPage';
import JoinPage from '@components/pages/JoinPage/JoinPage';
import LoginPage from '@components/pages/LoginPage/LoginPage';
import InterviewIntroPage from '@components/pages/InterviewIntroPage/InterviewIntroPage';
import ProblemListPage from '@components/pages/ProblemListPage/ProblemListPage';
import GlobalStyle from '@styles/GlobalStyle';

import PrivateRoute from './route';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <BasicPageLayout>
      <Routes>
        {/* 인증 여부 상관 없이 접속 가능한 페이지 정의 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/problem" element={<ProblemListPage />} />

        {/* 인증이 필요한 페이지 정의 */}
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<div>마이페이지</div>} />
          <Route path="/interview" element={<InterviewIntroPage />} />
        </Route>
        {/* 인증을 하지 않아야만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute authentication={false} />}>
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BasicPageLayout>
  </>
);

export default App;
