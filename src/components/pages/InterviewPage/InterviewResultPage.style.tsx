import styled from 'styled-components';

import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';

export const InterviewResultContainer = styled.div`
  display: inline-block;
  width: 100%;
  min-height: ${DISPLAY_HEIGHT_WITHOUT_HEADER};
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const SubTitle = styled.h2`
  padding: 0 200px;
  width: 100%;
  margin-top: 70px;
  margin-bottom: 50px;
`;

export const TableContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 200px;
  flex-grow: 1;
  background: transparent;
`;
