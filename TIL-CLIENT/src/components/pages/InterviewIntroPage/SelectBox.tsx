import React from 'react';
import { OrganizationSelectBox, OrganizationSelectContainer } from './SelectBar.style';

export interface Option {
  value: string;
  name: string;
}

interface SelectBoxProps {
  optionList: Option[];
  value: string;
  onChange: React.ChangeEventHandler;
}

const SelectBox: React.FC<SelectBoxProps> = ({ optionList, value, onChange }) => (
  <OrganizationSelectContainer>
    <OrganizationSelectBox onChange={onChange} value={value}>
      {optionList.map((option) => (
        <option value={option.value} key={option.value}>
          {option.name}
        </option>
      ))}
    </OrganizationSelectBox>
  </OrganizationSelectContainer>
);

export default SelectBox;
