import styled from 'styled-components';
import { Button } from '@styles/ButtonStyle';
import { BLACK, PRIMARY_PURPLE } from '@styles/pallete';

export const ProblemDetailContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #f9fafc;
`;

export const ProblemInfoBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 300px;
`;

export const InfoGroup = styled.div`
  display: flex;
  gap: 20px;
`;

export const Title = styled.h1`
  // 스타일링 추가
`;

export const Category = styled.div`
  align-self: center;
`;

export const ProblemInfo = styled.div`
  margin-left: 50px;
  align-self: center;
`;

export const LevelText = styled.span`
  color: #4e63ed;
  font-size: 20px;
  font-weight: bold;
  margin-left: 15px;
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 100%;
  overflow: hidden;
  padding: 0px 300px 100px 300px;
`;

export const QuestionSection = styled.div`
  width: 35%;
  background: #fff;
  padding: 20px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  box-shadow: 0px 1px 1px rgba(9, 9, 9, 0.15);
`;

export const QuestionTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 5px 0px 10px 10px;
  border-bottom: 1px solid #e0e0e0;
`;

export const Question = styled.div`
  padding: 20px 10px 10px 10px;
  line-height: 30px;
`;

export const AnswerSection = styled.div`
  width: 65%;
  background: #fff;
  padding: 20px;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  box-shadow: 0px 1px 1px rgba(9, 9, 9, 0.15);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const TabMenu = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

export const TabMenuItem = styled.div.attrs<{ active: boolean; disabled?: boolean }>((props) => ({
  active: props.active,
  disabled: props.disabled,
}))`
  padding: 7px 22px;
  cursor: pointer;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ active }) => (active ? PRIMARY_PURPLE : '#555555')};
  border-bottom: ${({ active }) => (active ? `2px solid ${PRIMARY_PURPLE}` : 'none')};

  &:hover {
    color: ${PRIMARY_PURPLE};
  }

  &:disabled {
    cursor: not-allowed;
    color: #c0c0c0;
  }
`;

export const TextDiv = styled.textarea`
  width: 100%;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  font-size: 15px;
  line-height: 1.5;
  resize: none;
  border: none;
  border-radius: 10px;
  flex-grow: 1;
  height: auto;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(116, 52, 255, 0.5);
  }
`;

export const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 300px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.1);
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const ProblemSolveFooterButton = styled.button<{ type: string }>`
  display: flex;
  gap: 8px;  
  align-items: center;
  cursor: pointer;
  width: max-content;
  padding: 0 15px;
  height: 40px;
  border-radius: 7px;

  border: ${({ type }) => {
    switch (type) {
      case 'RED':
      case 'PURPLE':
        return 'none';
      default:
        return '1.5px solid #999';
    }
  }};

  color: ${({ type }) => {
    switch (type) {
      case 'RED':
      case 'PURPLE':
        return '#fff';
      default:
        return '#333';
    }
  }};

  background-color: ${({ type }) => {
    switch (type) {
      case 'RED':
        return '#f16060';
      case 'PURPLE':
        return '#7434FF';
      default:
        return '#fff';
    }
  }};

  &:hover {
    background-color:
    ${({ type }) => {
      switch (type) {
        case 'RED':
          return '#c73232';
        case 'PURPLE':
          return '#5929C1';
        default:
          return '#eee';
      }
    }}
`;

export const ModalInnerButton = styled(Button)`
  width: 120px;
  height: 50px;
  font-size: 14px;
`;

export const ModalInnerText = styled.p<{ color?: string }>`
  margin: 15px 0;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: ${({ color }) => color || BLACK};
`;
