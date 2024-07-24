import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PageLayout from '@components/layout/PageLayout';

import JoinPage from '@components/pages/JoinPage/JoinPage';
import LoginPage from '@components/pages/LoginPage/LoginPage';
import './App.css';

const App: React.FC = () => (
  <PageLayout>
    <Routes>
      <Route path="/" element={<div>메인페이지</div>} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  </PageLayout>
);

export default App;
