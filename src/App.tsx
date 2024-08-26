import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ToastProvider } from '@components/common/notification/ToastProvider';
import MainPage from '@components/pages/MainPage/MainPage';
import JoinPage from '@components/pages/JoinPage/JoinPage';
import LoginPage from '@components/pages/LoginPage/LoginPage';
import InterviewIntroPage from '@components/pages/InterviewIntroPage/InterviewIntroPage';
import ProblemListPage from '@components/pages/ProblemListPage/ProblemListPage';
import ProblemDetailPage from '@components/pages/ProblemDetailPage/ProblemDetailPage';
import MyPageChangePassword from '@components/pages/MyPage/MyPageChangePassword';
import MyPageChangeInfo from '@components/pages/MyPage/MyPageChangeInfo';
import InterviewPage from '@components/pages/InterviewPage/InterviewPage';
import InterviewResultPage from '@components/pages/InterviewPage/InterviewResultPage';
import Loading from '@components/common/loading/Loading';
import { REFRESH_TOKEN } from '@constants/auth';
import GlobalStyle from '@styles/GlobalStyle';
import { getCookie } from '@services/cookie';
import useAuthStore from '@store/useAuthStore';
import { initialSettingTokens } from '@services/api/authService';

import PrivateRoute from './route';

const App: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { accessToken } = useAuthStore();

  const initializeTokens = async () => {
    if (getCookie(REFRESH_TOKEN)) {
      await initialSettingTokens();
    }
    setIsInitialized(true);
  };

  useEffect(() => {
    if (accessToken || !getCookie(REFRESH_TOKEN)) {
      return;
    }

    if (getCookie(REFRESH_TOKEN)) {
      initializeTokens();
      if (!getCookie(REFRESH_TOKEN) && !accessToken) {
        window.location.replace('/');
      }
    }
  }, [accessToken]);

  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <ToastProvider>
      <GlobalStyle />
      <Routes>
        {/* 인증 여부 상관 없이 접속 가능한 페이지 정의 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/problem" element={<ProblemListPage />} />
        <Route path="/problem/:id" element={<ProblemDetailPage />} />
        {/* 인증이 필요한 페이지 정의 */}
        <Route element={<PrivateRoute />}>
          <Route path="/mypage" element={<MyPageChangeInfo />} />
          <Route path="/mypage/change-password" element={<MyPageChangePassword />} />
          <Route path="/interview" element={<InterviewIntroPage />} />
          <Route path="/interview/:code" element={<InterviewPage />} />
          <Route path="/interview/:code/result" element={<InterviewResultPage />} />
        </Route>
        {/* 인증을 하지 않아야만 접속 가능한 페이지 정의 */}
        <Route element={<PrivateRoute authentication={false} />}>
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </ToastProvider>
  );
};

export default App;
