import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';
import { LIGHT_PURPLE } from '@styles/pallete';
import styled from 'styled-components';

export const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: ${DISPLAY_HEIGHT_WITHOUT_HEADER};
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;
`;

const MENU_TAB_SIZE = '300px';

export const MyPageMenuTab = styled.div`
  position: absolute;
  display: flex;
  width: ${MENU_TAB_SIZE};
  height: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${LIGHT_PURPLE};
`;

export const MyPageContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${MENU_TAB_SIZE};
  width: calc(100% - ${MENU_TAB_SIZE});
  height: 100%;
  padding: 90px 160px;
`;

export const MyPageContentTitle = styled.h2`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;
