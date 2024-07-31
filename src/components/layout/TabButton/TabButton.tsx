import Tab from './TabButton.style';

interface TabButtonProps {
  text: string;
  name: string;
  selected: string;
  onClick: React.MouseEventHandler;
}

const TabButton: React.FC<TabButtonProps> = ({ name, text, selected, onClick }) => (
  <Tab name={name} onClick={onClick} isSelected={selected === name}>
    {text}
  </Tab>
);

export default TabButton;
