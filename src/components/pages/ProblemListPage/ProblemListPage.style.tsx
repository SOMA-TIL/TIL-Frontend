// ProblemListPage.style.ts
import styled from 'styled-components';

export const ProblemPageContainer = styled.div`
  padding: 20px;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
`;

export const ProblemsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const ProblemItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;

  span {
    margin: 0 10px;
  }

  .title {
    font-weight: bold;
  }

  .category {
    color: green;
  }

  .level {
    color: blue;
  }

  .solved,
  .percentage {
    color: gray;
  }
`;
