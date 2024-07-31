import styled from 'styled-components';
import { WHITE } from '@styles/pallete';

const MainArea = styled.main`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 90px);
  flex: 1;
  background-color: ${WHITE};
`;

export default MainArea;
