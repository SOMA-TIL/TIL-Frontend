import styled from 'styled-components';

import { BLACK, LIGHT_GREY } from '@styles/pallete';

const HeaderArea = styled.header`
  display: flex;

  background-color: white;

  border-bottom: 1px solid ${LIGHT_GREY};

  width: 100%;
  height: 90px;

  box-shadow: rgba(100, 100, 100, 0.2) 0px 0px 29px 0px;
`;

export const Logo = styled.button`
  background-color: transparent;

  padding: 0px;
  margin-top: 10px;

  font-size: 12px;
  text-align: center;
  color: ${BLACK};

  img {
    height: 100%;
  }

  &:hover {
    background-color: transparent;
  }
`;

export const MenuItem = styled.button`
  background-color: transparent;
  color: ${BLACK};

  cursor: pointer;
  margin: 10px;
  padding: 10px 20px;
  font-size: 18px;
  white-space: nowrap;

  &:hover {
    background-color: transparent;
    color: rgb(5, 136, 243);
  }
`;

export default HeaderArea;
