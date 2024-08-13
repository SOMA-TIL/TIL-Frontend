import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import BasicPageLayout from '@components/layout/BasicPageLayout';
import { useToast } from '@components/common/notification/ToastProvider';
import { LoginData, login } from '@services/api/userService';
import useAuthStore from '@store/useAuthStore';
import useUserInfoStore from '@store/useUserInfoStore';
import { HalfWidthDiv } from '@styles/DivStyle';
import { PRIMARY_PURPLE } from '@styles/pallete';
import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';
import Form, { FormTitle } from '@styles/FormStyle';
import { Button } from '@styles/ButtonStyle';
import { Input } from '@styles/InputStyle';

import { getErrorMessage } from '@utils/errorHandler';
import { Token } from '@type/auth';
import { UserInfo } from '@type/user';
import { TOAST_TYPE } from '@constants/toast';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { notify } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    const loginData: LoginData = { email, password };

    try {
      const response = await login(loginData);
      const { token, user } = response.result as { token: Token; user: UserInfo };

      useAuthStore.getState().login(token);
      useUserInfoStore.getState().setNickname(user.nickname);

      navigate('/');
    } catch (err: unknown) {
      notify({ message: '로그인 실패', description: getErrorMessage(err), type: TOAST_TYPE.ERROR });
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
