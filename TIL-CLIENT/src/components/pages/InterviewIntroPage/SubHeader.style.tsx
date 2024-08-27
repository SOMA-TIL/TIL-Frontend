import styled from 'styled-components';

export const SubHeaderContainer = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  padding: 15px 15% 0px 15%;

  background-color: #fff;
`;

export const SubHeaderButton = styled.button<{ isSelected: boolean }>`
  align-items: center;

  color: ${({ isSelected }) => (isSelected ? '#7434ff' : '#999')};
  background-color: transparent;

  font-size: 18px;
  font-weight: bold;

  border-bottom: ${({ isSelected }) => (isSelected ? '2px solid #7434ff' : '0')};

  &:hover {
    color: ${({ isSelected }) => (isSelected ? '#7434FF' : '#333')};
  }

  margin: 0 20px 0 0;
`;
