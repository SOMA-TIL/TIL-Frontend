import { DISPLAY_HEIGHT } from '@styles/length';
import styled from 'styled-components';

export const InterviewMainContainer = styled.div`
  width: 100%;
  min-height: 600px;
  height: calc(${DISPLAY_HEIGHT} - 270px);

  background-color: #f9fafc;

  padding: 0 15% 5% 15%;
`;

export const InterviewContentContainer = styled.div`
  width: 100%;
  height: 100%;

  background-color: #fff;

  border: 1px solid #eee;
  border-radius: 15px;

  box-shadow: 0px -1px 10px 0px #f1f1f1;
`;

export const InterviewMessageContainer = styled.div`
  width: 100%;
  height: 70%;

  display: flex;
  flex-direction: column;

  overflow: auto;

  border-bottom: 1px solid #eee;
`;

export const InterviewInputContainer = styled.div`
  width: 100%;
  height: 30%;

  padding: 20px;
`;

export const InterviewInputTextArea = styled.textarea`
  min-width: 100%;
  min-height: 100%;

  resize: none;

  color: #999;
  font-size: 14px;

  border: 1px solid #ddd;
  border-radius: 15px;

  padding: 10px 15px;

  &:focus {
    outline:none;
    color: #333;
    border: 1px solid #555;
`;
