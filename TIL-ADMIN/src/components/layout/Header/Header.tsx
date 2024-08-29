import { useNavigate } from 'react-router-dom';

import HeaderMenuItem, { HeaderLogoutButton } from '@components/layout/Header/HeaderMenuItem';
import useAuthStore from '@store/useAuthStore';
import { logoutClearStores } from '@store/clear';
import HeaderArea, { Logo, Section } from './Header.style';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleHomeButton = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    try {
      // await logout();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    } finally {
      logoutClearStores();
      window.location.replace('/');
    }
  };

  return (
    <HeaderArea>
      <Section pos="left">
        <Logo onClick={handleHomeButton}>
          <img src="/images/TIL_logo.png" alt="TIL_logo" />
        </Logo>
      </Section>

      <Section pos="center">
        <HeaderMenuItem title="문제 관리" path="/" />
        <HeaderMenuItem title="기술 학습" path="/" />
        <HeaderMenuItem title="모의 면접" path="/" />
      </Section>

      <Section pos="right">
        {!isAuthenticated && (
          <>
            <HeaderMenuItem title="로그인" path="/login" />
            <HeaderMenuItem title="회원가입" path="/join" />
          </>
        )}
        {isAuthenticated && (
          <HeaderLogoutButton title="로그아웃" path="/logout" onClick={handleLogout} />
        )}
      </Section>
    </HeaderArea>
  );
};

export default Header;
