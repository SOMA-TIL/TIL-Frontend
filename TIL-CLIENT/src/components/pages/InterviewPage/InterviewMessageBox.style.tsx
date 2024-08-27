import styled from 'styled-components';

export const InterviewMessageBoxContainer = styled.div<{ type: string }>`
  width: 100%;
  height: max-content;

  display: flex;
  align-items: center;

  padding: 10px 20px;
`;

export const InterviewMessageProfile = styled.div<{ type: string }>`
  width: 100px;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;

  align-items: center;

  padding: 0 10px;

  img {
    width: 50px;

    margin-top: auto;

    border-radius: 100%;
    background-color: #d9d9d9;
  }

  p {
    width: max-content;

    color: #111;
  }
`;

export const InterviewMessage = styled.div<{ type: string }>`
  width: max-content;
  max-width: 70%;
  height: max-content;

  padding: 20px;

  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: pre-wrap;

  border-radius: ${({ type }) => {
    switch (type) {
      case 'interviewer':
        return '20px 20px 20px 0';
      case 'interviewee':
        return '20px 20px 0 20px';
      default:
        return '20px';
    }
  }};

  background-color: ${({ type }) => {
    switch (type) {
      case 'interviewer':
        return '#F0EAFB';
      case 'interviewee':
        return '#F5F5F5';
      default:
        return '#F5F5F5';
    }
  }};
`;

export const InterviewMessageTime = styled.p<{ type: string }>`
  width: max-content;

  color: #555;
  font-size: 12px;

  padding: 10px;

  margin: ${({ type }) => {
    switch (type) {
      case 'interviewer':
        return 'auto auto 0 0';
      case 'interviewee':
        return 'auto 0 0 auto';
      default:
        return '0';
    }
  }};

  position: relative;
`;
