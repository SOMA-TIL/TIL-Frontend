import { useNavigate } from 'react-router-dom';

import './HeaderMenuButton.css';

interface HeaderMenuButtonProps {
  title: string;
  path: string;
}

const HeaderMenuButton: React.FC<HeaderMenuButtonProps> = ({ title, path }) => {
  const navigate = useNavigate();

  const handleHeaderMenuButton = () => {
    navigate(path);
  };

  return (
    <button type="button" className="HeaderMenuButton" onClick={handleHeaderMenuButton}>
      {title}
    </button>
  );
};

export default HeaderMenuButton;
