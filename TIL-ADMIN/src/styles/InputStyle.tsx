import styled from 'styled-components';
import { LIGHT_GREY, WHITE } from './pallete';

export const Input = styled.input<{ width?: string; height?: string }>`
  width: ${(props) => props.width || '640px'};
  height: ${(props) => props.height || '52px'};
  font-size: 15px;
  padding: 0 20px;
  margin-bottom: 20px;
  border: 1px solid ${LIGHT_GREY};
  border-radius: 10px;
  background-color: ${WHITE};
`;

export const DisabledInput = styled(Input)`
  background-color: ${LIGHT_GREY};
  cursor: not-allowed;
`;
