interface OptionInterface {
  value: string;
  name: string;
}
interface SelectBoxProps {
  optionList: OptionInterface[];
  value: string;
  onChange: React.ChangeEventHandler;
}

const SelectBox: React.FC<SelectBoxProps> = ({ optionList, value, onChange }) => (
  <select onChange={onChange} value={value}>
    {optionList.map((option) => (
      <option value={option.value} key={option.value}>
        {option.name}
      </option>
    ))}
  </select>
);

export default SelectBox;
