import { PRIMARY_PURPLE } from '@styles/pallete';
import styled from 'styled-components';

export const OthersAnswerContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #f9fafc;
`;

export const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: 0 300px;
  margin-top: 30px;
  margin-bottom: 100px;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 20px;
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

export const QuestionContent = styled.div`
  flex: 1;
  padding-right: 20px;
`;

export const AnswerListSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0px 1px 1px rgba(9, 9, 9, 0.15);
  height: calc(100vh - 360px);
  display: flex;
  flex-direction: column;
`;

export const TabMenu = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  gap: 10px;
  margin-bottom: 24px;
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

export const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const AnswerItem = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;

  &:hover {
    border-color: #7434ff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

export const UserName = styled.span`
  font-weight: 500;
  color: #333;
`;

export const Content = styled.p`
  white-space: pre-wrap;
  margin: 0;
  margin-bottom: 12px;
  line-height: 1.6;
`;

export const LikeButton = styled.div<{ isLiked: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ isLiked }) => (isLiked ? '#7434FF' : '#666')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #7434ff;
  }

  .anticon {
    font-size: 16px;
  }
`;

export const LikeCount = styled.span`
  font-size: 14px;
`;
