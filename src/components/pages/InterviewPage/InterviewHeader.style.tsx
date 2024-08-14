import styled from 'styled-components';

export const InterviewHeaderContainer = styled.header`
  width: 100%;
  height: 60px;

  position: relative;

  display: flex;

  background-color: #fff;

  padding: 10px 15%;

  border-bottom: 1px solid #ddd;
`;

export const InterviewHeaderLogo = styled.div`
  img {
    height: 40px;
  }
`;

export const InterviewHeaderButton = styled.button`
  align-items: center;
  position: absolute;
  right: 15%;

  cursor: pointer;

  width: 120px;
  height: 40px;

  color: #fff;
  background-color: #7434ff;

  border-radius: 7px;

  &:hover {
    background-color: #5929c1;
  }
`;
