import { useNavigate } from 'react-router-dom';

import './Footer.css';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleClickPrivatePolicyButton = () => {
    navigate('/policy');
  };

  return (
    <footer className="Footer">
      <p>SW 마에스트로 15기 선인장</p>
      <p>서울특별시 강남구 테헤란로 311 아남타워빌딩 7층 (우편번호 : 06151)</p>
      <p>Copyright © 2024 TIL - All rights reserved.</p>
      <button type="button" onClick={handleClickPrivatePolicyButton}>
        개인정보처리방침
      </button>
    </footer>
  );
};

export default Footer;
