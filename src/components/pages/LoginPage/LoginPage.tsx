import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import BasicPageLayout from '@components/layout/BasicPageLayout';
import { LoginData, login } from '@services/api/userService';
import useAuthStore from '@store/useAuthStore';
import useUserInfoStore from '@store/useUserInfoStore';
import { HalfWidthDiv } from '@styles/DivStyle';
import { PRIMARY_PURPLE } from '@styles/pallete';
import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';
import Form, { FormTitle } from '@styles/FormStyle';
import { Button } from '@styles/ButtonStyle';
import { Input } from '@styles/InputStyle';

import { alertError } from '@utils/errorHandler';
import { showAlertPopup } from '@utils/showPopup';
import { Token } from '@type/auth';
import { UserInfo } from '@type/user';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    const loginData: LoginData = { email, password };

    try {
      const response = await login(loginData);
      const { token, user } = response.result as { token: Token; user: UserInfo };

      useAuthStore.getState().login(token);
      useUserInfoStore.getState().setNickname(user.nickname);

      showAlertPopup('로그인 성공');
      navigate('/');
    } catch (err: unknown) {
      alertError(err);
      setPassword('');
    }
  };

  return (
    <BasicPageLayout>
      <HalfWidthDiv bgColor={PRIMARY_PURPLE} height={DISPLAY_HEIGHT_WITHOUT_HEADER}>
        <img src="/images/ad.png" alt="TIL ad" style={{ width: '700px' }} />
      </HalfWidthDiv>

      <HalfWidthDiv>
        <Form onSubmit={handleSubmit} style={{}}>
          <FormTitle>로그인</FormTitle>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
          <Button type="submit">로그인</Button>
        </Form>
      </HalfWidthDiv>
    </BasicPageLayout>
  );
};

export default LoginPage;
