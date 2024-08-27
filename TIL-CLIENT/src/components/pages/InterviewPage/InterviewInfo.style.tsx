import styled from 'styled-components';

export const InterviewInfoContainer = styled.div`
  width: 100%;
  height: 150px;

  position: relative;

  display: flex;
  align-items: center;

  background-color: #f9fafc;

  padding: 10px 15%;
`;

export const InterviewInfoTitle = styled.h4`
  line-height: 130px;
  color: #111;
  font-size: 24px;
  font-weight: bold;

  margin-right: 15px;
`;

export const InterviewInfoCategory = styled.div`
  width: max-content;
  height: 20px;

  padding: 0 10px;

  line-height: 20px;
  text-align: center;
  font-size: 10px;

  background-color: #555;
  color: #fff;

  border-radius: 5px;
  margin-right: 5px;
`;

export const InterviewInfoDescription = styled.p`
  width: max-content;
  height: 20px;

  position: absolute;
  right: 15%;

  color: #111;
`;
