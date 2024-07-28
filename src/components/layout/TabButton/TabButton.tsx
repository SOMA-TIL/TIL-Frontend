import './TabButton.css';

interface TabButtonProps {
  text: string;
  name: string;
  selected: string;
  onClick: React.MouseEventHandler;
}

const TabButton: React.FC<TabButtonProps> = ({ name, text, selected, onClick }) => (
  <button
    type="button"
    name={name}
    onClick={onClick}
    className={`TabButton ${selected === name ? 'selected' : ''}`}
  >
    {text}
  </button>
);

export default TabButton;
