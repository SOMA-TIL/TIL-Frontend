import { ClockCircleOutlined, LaptopOutlined } from '@ant-design/icons';
import {
  OrganizationFooterButton,
  OrganizationFooterContainer,
  OrganizationFooterDescription,
} from './OrganizationFooter.style';

interface OrganizationFooterProps {
  onClick: React.MouseEventHandler;
}

const OrganizationFooter: React.FC<OrganizationFooterProps> = ({ onClick }) => (
  <OrganizationFooterContainer>
    <OrganizationFooterDescription>
      <ClockCircleOutlined />
      <span> 예상 소요 시간: 최대 30분</span>
    </OrganizationFooterDescription>
    <OrganizationFooterButton onClick={onClick}>
      <LaptopOutlined /> 면접 시작하기
    </OrganizationFooterButton>
  </OrganizationFooterContainer>
);

export default OrganizationFooter;
