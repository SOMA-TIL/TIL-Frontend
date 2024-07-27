import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderMenuButton from '@components/layout/HeaderMenuButton/HeaderMenuButton';
import { logout } from '@services/api/userService';
import useAuthStore from '@store/useAuthStore';
import { logoutClearStores } from '@store/clear';
import './Header.css';

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
    window.location.reload();
  };

  return (
    <header className="Header">
      <button type="button" className="LogoButton" onClick={handleHomeButton}>
        <img src="/TIL_logo.png" alt="TIL_logo" />
      </button>
      <HeaderMenuButton title="기술 학습" path="/problem" />
      <HeaderMenuButton title="기술 면접" path="/interview" />

      {!isAuthenticated && (
        <>
          <HeaderMenuButton title="로그인" path="/login" />
          <HeaderMenuButton title="회원가입" path="/join" />
        </>
      )}
      {isAuthenticated && (
        <>
          <HeaderMenuButton title="마이페이지" path="/mypage" />
          <HeaderMenuButton title="로그아웃" path="/logout" onClick={handleLogout} />
        </>
      )}
    </header>
  );
};

export default Header;
