import styled from 'styled-components';
import { Input } from 'antd';

import { DISPLAY_HEIGHT_WITHOUT_HEADER } from '@styles/length';
import { Button } from '@styles/ButtonStyle';
import { BLACK, PRIMARY_PURPLE } from '@styles/pallete';

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

export const BookMarkIcon = ({ isFavorite }: { isFavorite: boolean }) => (
  <svg
    width="20"
    height="26"
    viewBox="0 0 20 26"
    fill={isFavorite ? PRIMARY_PURPLE : 'none'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.25 7.75C1.25 5.6498 1.25 4.5997 1.65873 3.79754C2.01825 3.09193 2.59193 2.51825 3.29754 2.15873C4.0997 1.75 5.1498 1.75 7.25 1.75H12.75C14.8502 1.75 15.9003 1.75 16.7025 2.15873C17.4081 2.51825 17.9817 3.09193 18.3413 3.79754C18.75 4.5997 18.75 5.6498 18.75 7.75V24.25L10 19.25L1.25 24.25V7.75Z"
      stroke={isFavorite ? PRIMARY_PURPLE : BLACK}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
