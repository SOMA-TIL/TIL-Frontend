import { GREY } from '@styles/pallete';
import styled from 'styled-components';

const Tab = styled.button<{ isSelected: boolean }>`
  color: black;
  background-color: ${({ isSelected }) => (isSelected ? '#c8c8c8' : GREY)};
  border-radius: 10px 10px 0px 0px;

  &:hover {
    color: blue;
    background-color: ${GREY};
  }
`;

export default Tab;
