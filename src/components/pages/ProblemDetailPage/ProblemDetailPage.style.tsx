import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';
import { Button } from '@styles/ButtonStyle';
import styled from 'styled-components';
import { Input } from 'antd';

const { TextArea } = Input;

export const ProblemDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  position: relative;
  min-height: ${DISPLAY_HEIGHT_WITHOUT_HEADER};
`;

export const ProblemInfoBar = styled.div`
  display: flex;
  flex: 0.1;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.h1`
  // 스타일링 추가
`;

export const Category = styled.div`
  // 스타일링 추가
`;

export const ProblemInfo = styled.div`
  // 스타일링 추가
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 0.8;
  overflow: auto;
`;

export const QuestionSection = styled.div`
  width: 40%;
  background: #f0f0f0;
  padding: 20px;
  overflow-y: auto;
`;

export const AnswerSection = styled.div`
  width: 60%;
  overflow-y: auto;
`;

export const Question = styled.div`
  padding: 5px;
`;

export const BottomBar = styled.div`
  display: flex;
  flex: 0.1;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const CustomButton = styled(Button)`
  width: 150px;
  height: 50px;
  font-size: 14px;
`;

export const CustomLoginButton = styled(Button)`
  width: 150px;
  height: 50px;
  font-size: 14px;
  margin-left: auto;
`;

export const TextDiv = styled.div`
  padding: 10px;
`;

export const StyledTextArea = styled(TextArea)`
  resize: none;
`;
