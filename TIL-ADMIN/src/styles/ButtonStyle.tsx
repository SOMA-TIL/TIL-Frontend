import styled from 'styled-components';
import { LIGHT_GREY2, PRIMARY_PURPLE, WHITE } from './pallete';

export const Button = styled.button<{
  width?: string;
  height?: string;
  fontSize?: string;
  bgColor?: string;
}>`
  width: ${(props) => props.width || '640px'};
  height: ${(props) => props.height || '60px'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: bold;
  color: ${WHITE};
  background-color: ${(props) => props.bgColor || PRIMARY_PURPLE};
  border: none;
  border-radius: 10px;

  &:hover {
    background-color: ${(props) => props.bgColor || PRIMARY_PURPLE};
  }
`;

export const DisabledButton = styled(Button)`
  background-color: ${LIGHT_GREY2};
  cursor: not-allowed;
`;
