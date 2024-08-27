import styled from 'styled-components';

export const PaginationContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff; /* 배경색을 추가하여 페이지와 구분 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05); /* 그림자 추가로 분리 효과 */
  z-index: 1000; /* 다른 요소 위에 위치시키기 위해 z-index 설정 */
`;

export const PaginationButton = styled.button<{ disabled?: boolean; active?: boolean }>`
  padding: 8px 16px;
  margin: 0 5px;
  font-size: 16px;
  background-color: ${({ active }) => (active ? '#7434FF' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#7434FF')};
  border: ${({ active }) => (active ? '1px solid #7434FF' : '1px solid #ccc')};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover {
    background-color: ${({ disabled, active }) => (!disabled && !active ? '#e6e6e6' : '')};
  }
`;
