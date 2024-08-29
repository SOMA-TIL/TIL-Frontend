import { useNavigate } from 'react-router-dom';
import FooterArea, { FooterText, FooterButton } from './Footer.style';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const handleClickPrivatePolicyButton = () => {
    navigate('/policy');
  };

  return (
    <FooterArea>
      <FooterText>SW 마에스트로 15기 선인장</FooterText>
      <FooterText>서울특별시 강남구 테헤란로 311 아남타워빌딩 7층 (우편번호 : 06151)</FooterText>
      <FooterText>Copyright © 2024 TIL - All rights reserved.</FooterText>
      <FooterButton onClick={handleClickPrivatePolicyButton}>개인정보처리방침</FooterButton>
    </FooterArea>
  );
};

export default Footer;
