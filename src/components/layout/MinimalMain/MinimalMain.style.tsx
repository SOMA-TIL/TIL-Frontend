import styled from 'styled-components';
import { WHITE } from '@styles/pallete';
import { DISPLAY_HEIGHT } from '@styles/length';

const MinimalMainArea = styled.main`
  width: 100%;
  position: relative;

  display: flex;
  flex-direction: column;

  align-items: center;

  min-height: ${DISPLAY_HEIGHT};
  flex: 1;
  background-color: ${WHITE};
`;

export default MinimalMainArea;
