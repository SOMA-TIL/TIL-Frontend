import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';
import styled from 'styled-components';

export const InterviewIntroContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: ${DISPLAY_HEIGHT_WITHOUT_HEADER};
  background-color: #f9fafc;
`;

export const InterviewContentContainer = styled.div`
  width: 100%;
  min-height: 510px;
  height: max-content;

  padding: 3% 15%;

  border-top: 1px solid #ddd;
`;

export const OrganizationSectionContainer = styled.div`
  width: 100%;
  min-height: 150px;
  height: 250px;

  padding: 10px 0;

  border-bottom: 1px solid #ddd;
`;

export const OrganizationSectionContainerNoBorder = styled.div`
  width: 100%;
  min-height: 150px;
  height: max-content;

  padding: 10px 0;
`;

export const OrganizationSectionTitle = styled.h4`
  color: #111;
  font-size: 18px;
  font-weight: bold;
  padding-top: 50px;
  margin-bottom: 10px;
`;

export const OrganizationSectionDescription = styled.p`
  color: #555;
  font-size: 14px;

  margin-bottom: 20px;
`;

export const SelectedCategoryButton = styled.button`
  color: #fff;
  background-color: #555;

  width: 120px;
  height: 40px;

  font-size: 14px;

  border-radius: 7px;
  cursor: pointer;

  margin: 5px;

  &:hover {
    background-color: #f16060;
  }
`;
