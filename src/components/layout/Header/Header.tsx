import { useNavigate } from 'react-router-dom';

import HeaderMenuButton from '@components/layout/HeaderMenuButton/HeaderMenuButton';

import './Header.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate('/');
  };
  return (
    <header className="Header">
      <button type="button" className="LogoButton" onClick={handleHomeButton}>
        <img src="/TIL_logo.png" alt="TIL_logo" />
      </button>
      <HeaderMenuButton title="기술 학습" path="/problem" />
      <HeaderMenuButton title="기술 면접" path="/interview" />
      <HeaderMenuButton title="로그인" path="/login" />
      <HeaderMenuButton title="회원가입" path="/join" />
    </header>
  );
};

export default Header;
