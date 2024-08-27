import styled from 'styled-components';
import { WHITE } from '@styles/pallete';
import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';

const MainArea = styled.main`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${DISPLAY_HEIGHT_WITHOUT_HEADER};
  flex: 1;
  background-color: ${WHITE};
`;

export default MainArea;
