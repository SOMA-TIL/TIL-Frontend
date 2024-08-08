import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderMenuItem, { HeaderLogoutButton } from '@components/layout/Header/HeaderMenuItem';
import { logout } from '@services/api/userService';
import useAuthStore from '@store/useAuthStore';
import { logoutClearStores } from '@store/clear';
import HeaderArea, { Hr, Logo, Section } from './Header.style';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuthentication } = useAuthStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const handleHomeButton = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    await logout();
    logoutClearStores();
    window.location.replace('/');
  };

  return (
    <HeaderArea>
      <Section pos="left">
        <Logo onClick={handleHomeButton}>
          <img src="/images/TIL_logo.png" alt="TIL_logo" />
        </Logo>
      </Section>

      <Section pos="center">
        <HeaderMenuItem title="기술 학습" path="/problem" />
        <HeaderMenuItem title="모의 기술 면접" path="/interview" />
      </Section>

      <Section pos="right">
        {!isAuthenticated && (
          <>
            <HeaderMenuItem title="로그인" path="/login" />
            <HeaderMenuItem title="회원가입" path="/join" />
          </>
        )}
        {isAuthenticated && (
          <>
            <HeaderMenuItem title="마이페이지" path="/mypage" />
            <Hr />
            <HeaderLogoutButton title="로그아웃" path="/logout" onClick={handleLogout} />
          </>
        )}
      </Section>
    </HeaderArea>
  );
};

export default Header;
