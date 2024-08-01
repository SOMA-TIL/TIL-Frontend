import styled from 'styled-components';

import { BLACK, LIGHT_GREY, PRIMARY_PURPLE, WHITE } from '@styles/pallete';
import { HEADER_HEIGHT } from '@styles/length';
import { Button } from '@styles/ButtonStyle';

const HeaderArea = styled.header`
  display: flex;

  background-color: ${WHITE};

  border-bottom: 1px solid ${LIGHT_GREY};

  width: 100%;
  height: ${HEADER_HEIGHT};

  padding: 0px 30px;

  box-shadow: rgba(100, 100, 100, 0.2) 0px 0px 29px 0px;

  *:focus {
    outline: none;
  }
`;

export const Section = styled.div<{ pos?: string }>`
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 300px;

  flex-grow: ${(props) => (props.pos === 'center' ? 1 : 0)};
  justify-content: ${(props) => props.pos};
`;

export const Logo = styled.button`
  background-color: transparent;

  padding: 0px;

  text-align: center;
  color: ${BLACK};

  img {
    width: 160px;
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
  padding: 10px 10px;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;

  &:hover {
    background-color: transparent;
    color: ${PRIMARY_PURPLE};
  }
`;

export const LogoutButton = styled(Button)`
  position: relative;
  width: 117px;
  height: 40px;
  font-size: 15px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  img {
    margin-right: 10px;
    height: 20px;
  }
`;

export const Hr = styled.hr`
  margin-right: 20px;
  border: 1px solid ${LIGHT_GREY};
  height: 30px;
`;

export default HeaderArea;
