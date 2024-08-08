import { useNavigate } from 'react-router-dom';
import { MyPageMenuTab } from './MyPage.style';

const MyPageMenu: React.FC = () => {
  const navigate = useNavigate();
  return (
    <MyPageMenuTab>
      <button type="button" onClick={() => navigate('/mypage')}>
        내 정보 수정
      </button>
      <button type="button" onClick={() => navigate('/mypage/change-password')}>
        비밀번호 변경
      </button>
    </MyPageMenuTab>
  );
};

export default MyPageMenu;
