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
      면접 구성하기
    </SubHeaderButton>
    <SubHeaderButton
      name="InterviewHistory"
      onClick={onClick}
      isSelected={selected === 'InterviewHistory'}
    >
      기록 확인하기
    </SubHeaderButton>
  </SubHeaderContainer>
);

export default SubHeader;
