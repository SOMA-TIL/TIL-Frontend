import { useNavigate } from 'react-router-dom';
import { DARK_GREY, WHITE } from '@styles/pallete';

import { KeyIcon, MyPageMenuTab, MyPageMenuTabButton, UserIcon } from './MyPage.style';

interface MyPageMenuProps {
  currMenu: string;
}

const MyPageMenu: React.FC<MyPageMenuProps> = ({ currMenu }) => {
  const navigate = useNavigate();

  return (
    <MyPageMenuTab>
      <MyPageMenuTabButton
        type="button"
        isActive={currMenu === 'mypage'}
        onClick={() => navigate('/mypage')}
      >
        <UserIcon color={currMenu === 'mypage' ? WHITE : DARK_GREY} />내 정보 수정
      </MyPageMenuTabButton>
      <MyPageMenuTabButton
        type="button"
        isActive={currMenu === 'change-password'}
        onClick={() => navigate('/mypage/change-password')}
      >
        <KeyIcon color={currMenu === 'change-password' ? WHITE : DARK_GREY} />
        비밀번호 수정
      </MyPageMenuTabButton>
    </MyPageMenuTab>
  );
};

export default MyPageMenu;
