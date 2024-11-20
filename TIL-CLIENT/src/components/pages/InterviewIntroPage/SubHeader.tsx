import { SubHeaderContainer, SubHeaderButton } from './SubHeader.style';

interface SubHeaderButtonProps {
  selected: string;
  onClick: React.MouseEventHandler;
}

const SubHeader: React.FC<SubHeaderButtonProps> = ({ selected, onClick }) => (
  <SubHeaderContainer>
    <SubHeaderButton
      name="InterviewOrganization"
      onClick={onClick}
      isSelected={selected === 'InterviewOrganization'}
    >
      기술 기반 면접 구성하기
    </SubHeaderButton>
    <SubHeaderButton
      name="InterviewExOrganization"
      onClick={onClick}
      isSelected={selected === 'InterviewExOrganization'}
    >
      경험 기반 면접 구성하기
    </SubHeaderButton>
  </SubHeaderContainer>
);

export default SubHeader;
