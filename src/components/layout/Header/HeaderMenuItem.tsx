import { useNavigate } from 'react-router-dom';

import { MenuItem, LogoutButton } from './Header.style';

interface HeaderMenuButtonProps {
  title: string;
  path: string;
  onClick?: () => void;
}

const HeaderMenuItem: React.FC<HeaderMenuButtonProps> = ({ title, path, onClick }) => {
  const navigate = useNavigate();

  const handleHeaderMenuButton = () => {
    if (onClick) {
      return onClick();
    }
    return navigate(path);
  };

  return <MenuItem onClick={handleHeaderMenuButton}>{title}</MenuItem>;
};

export const HeaderLogoutButton: React.FC<HeaderMenuButtonProps> = ({ title, path, onClick }) => {
  const navigate = useNavigate();

  const handleButton = () => {
    if (onClick) {
      return onClick();
    }
    return navigate(path);
  };

  return (
    <LogoutButton onClick={handleButton}>
      <img src="images/logout_icon.png" alt="logout" /> {title}
    </LogoutButton>
  );
};

export default HeaderMenuItem;
