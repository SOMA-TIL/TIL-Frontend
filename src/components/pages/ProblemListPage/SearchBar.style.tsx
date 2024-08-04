import styled from 'styled-components';

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  // border-bottom: 1px solid #dee2e6;
  margin-bottom: 20px;
`;

export const SearchInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  flex: 1;
  margin-right: 10px;
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 16px;
  margin-right: 10px;
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #6f42c1;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #563d7c;
  }
`;
