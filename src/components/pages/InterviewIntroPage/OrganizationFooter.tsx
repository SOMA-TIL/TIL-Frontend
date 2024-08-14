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
      <span>🛈 예상 소요 시간: 최대 30분</span>
    </OrganizationFooterDescription>
    <OrganizationFooterButton onClick={onClick}>🗪 면접 시작하기</OrganizationFooterButton>
  </OrganizationFooterContainer>
);

export default OrganizationFooter;
