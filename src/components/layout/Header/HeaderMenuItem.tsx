import { useNavigate } from 'react-router-dom';

import { MenuItem } from './Header.style';

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

export default HeaderMenuItem;
