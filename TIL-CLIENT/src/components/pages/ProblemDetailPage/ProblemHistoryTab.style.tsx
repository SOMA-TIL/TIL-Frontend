// ProblemHistoryTab.style.tsx
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 10px 10px 10px;
  overflow: hidden;

  overflow-y: auto;
`;

export const SolutionBox = styled.div`
  background-color: #ffffff;
  padding: 12px 0px 12px 0px;
  border-radius: 8px;
  margin-bottom: 16px;
  flex: 0.3;
  display: flex;
  flex-direction: column;

  p {
    font-size: 16px;
    line-height: 1.5;
    overflow-y: auto;
    flex: 1;
    margin: 0;
  }
`;

export const SubTitleBox = styled.div`
  background-color: #555555;
  color: #ffffff;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  display: inline-block;
  width: fit-content;
`;

export const StyledTable = styled.div`
  flex: 0.7;
  .ant-table-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .ant-table {
    flex: 1;
    overflow-y: auto;
  }

  .ant-table-thead > tr > th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .ant-table-tbody > tr > td {
    background-color: #ffffff;
  }

  .ant-table-tbody > tr:hover > td {
    background-color: #f0f0f0;
  }

  .ant-pagination-item-active {
    border-color: #40a9ff;
  }
`;
