import styled from 'styled-components';

export const InterviewFooterContainer = styled.div`
  width: 100%;
  height: 60px;

  position: absolute;
  bottom: 0;

  background-color: #fff;

  display: flex;

  padding: 10px 15%;

  box-shadow: 0px -1px 10px 0px #f1f1f1;
`;

export const InterviewFooterDescription = styled.p`
  width: max-content;

  color: #555;
  font-size: 14px;

  margin: 0;
  padding: 0;

  line-height: 40px;
`;

export const InterviewFooterButton = styled.button<{ type: string }>`
  align-items: center;

  cursor: pointer;
  position: absolute;

  width: max-content;
  padding: 0 20px;
  height: 40px;

  border-radius: 7px;
  margin-right: 5px;

  right: ${({ type }) => {
    switch (type) {
      case 'RED':
        return 'calc(15% + 120px)';
      case 'PURPLE':
        return '15%';
      default:
        return 'calc(15% + 255px)';
    }
  }};

  border: ${({ type }) => {
    switch (type) {
      case 'RED':
      case 'PURPLE':
        return 'none';
      default:
        return '1px solid #333';
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
