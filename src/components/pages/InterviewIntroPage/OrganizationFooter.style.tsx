import styled from 'styled-components';

export const OrganizationFooterContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  background-color: #fff;

  width: 100%;
  height: 60px;

  display: flex;

  padding: 10px 15%;

  box-shadow: 0px -1px 10px 0px #f1f1f1;
`;

export const OrganizationFooterDescription = styled.p`
  color: #555;
  font-size: 14px;

  margin: 0;
  padding: 0;

  line-height: 40px;
`;

export const OrganizationFooterButton = styled.button`
  align-items: center;
  position: absolute;
  right: 33%;

  cursor: pointer;

  width: 120px;
  height: 40px;

  color: #fff;
  background-color: #f16060;

  border-radius: 7px;

  &:hover {
    background-color: #c73232;
  }
`;
