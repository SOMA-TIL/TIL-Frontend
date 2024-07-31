import styled from 'styled-components';
import { WHITE } from './pallete';

export const HalfWidthDiv = styled.div<{ bgColor?: string; height?: string }>`
  width: 50%;
  height: ${(props) => props.height || '100%'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${(props) => props.bgColor || WHITE};
`;

export const FullWidthDiv = styled.div`
  width: 100%;
`;
