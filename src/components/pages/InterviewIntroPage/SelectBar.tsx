import React from 'react';
import {
  OrganizationSelectBox,
  OrganizationSelectButton,
  OrganizationSelectContainer,
} from './SelectBar.style';

export interface Option {
  value: string;
  name: string;
}

interface SelectBoxProps {
  optionList: Option[];
  value: string;
  text: string;
  onChange: React.ChangeEventHandler;
  onClick: React.MouseEventHandler;
}

const SelectBox: React.FC<SelectBoxProps> = ({ optionList, value, text, onChange, onClick }) => (
  <OrganizationSelectContainer>
    <OrganizationSelectBox onChange={onChange} value={value}>
      {optionList.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </OrganizationSelectBox>
    <OrganizationSelectButton onClick={onClick}>{text}</OrganizationSelectButton>
  </OrganizationSelectContainer>
);

export default SelectBox;
