import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginData, login } from '@services/api/userService';
import { setCookie } from '@services/cookie';
import useAuthStore from '@store/useAuthStore';
import { alertError } from '@utils/errorHandler';
import { showAlertPopup } from '@utils/showPopup';
import { Token } from '@type/auth';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    const loginData: LoginData = { email, password };

    try {
      const response = await login(loginData);
      const { accessToken, refreshToken } = response.result as Token;
      useAuthStore.getState().setAccessToken(accessToken);
      setCookie('refreshToken', refreshToken);
      showAlertPopup('로그인 성공');
      navigate('/');
    } catch (err: unknown) {
      alertError(err);
      setPassword('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 주소"
          required
        />
        <input
          type="password" // 비밀번호 필드로 변경
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
