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
  height: calc(100vh - 360px);
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: 0px 1px 1px rgba(9, 9, 9, 0.15);
`;

export const TabMenu = styled.div`
  display: flex;
  flex-shrink: 0;
  padding-bottom: 12px;
  width: 100%;
`;

export const TabMenuItem = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding: 5px 0px 10px 10px;
`;

export const AnswerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
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
  position: relative;

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
  padding-right: 60px;
  line-height: 1.6;
`;

export const LikeButton = styled.div<{ isLiked: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ isLiked }) => (isLiked ? '#7434FF' : '#666')};
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: 4px;

  &:hover {
    background: ${({ isLiked }) => (isLiked ? '#f3f0ff' : '#f5f5f5')};
  }

  .anticon {
    font-size: 16px;
  }
`;

export const LikeCount = styled.span`
  font-size: 14px;
  min-width: 20px;
`;

export const EmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

export const SubmitHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding-right: 10px;
`;

export const SubmitHistoryItem = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
`;

export const SubmitInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const SubmitTime = styled.span`
  color: #666;
  font-size: 14px;
`;

export const GradingStatus = styled.span<{ status: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  background: ${({ status }) => {
    switch (status) {
      case 'PASS':
        return '#e6f7e6';
      case 'FAIL':
        return '#ffe6e6';
      default:
        return '#f0f0f0';
    }
  }};
  color: ${({ status }) => {
    switch (status) {
      case 'PASS':
        return '#52c41a';
      case 'FAIL':
        return '#ff4d4f';
      default:
        return '#666';
    }
  }};
`;

export const SubmitContent = styled.pre`
  white-space: pre-wrap;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
`;
