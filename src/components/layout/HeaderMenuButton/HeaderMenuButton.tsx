import { useNavigate } from 'react-router-dom';

import './HeaderMenuButton.css';

interface HeaderMenuButtonProps {
  title: string;
  path: string;
  onClick?: () => void;
}

const HeaderMenuButton: React.FC<HeaderMenuButtonProps> = ({ title, path, onClick }) => {
  const navigate = useNavigate();

  const handleHeaderMenuButton = () => {
    if (onClick) {
      return onClick();
    }
    return navigate(path);
  };

  return (
    <button type="button" className="HeaderMenuButton" onClick={handleHeaderMenuButton}>
      {title}
    </button>
  );
};

export default HeaderMenuButton;
