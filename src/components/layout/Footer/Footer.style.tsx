import styled from 'styled-components';
import { BLACK, BLUE, LIGHT_GREY } from '@styles/pallete';

const FooterArea = styled.footer`
  text-align: center;
  align-items: center;

  padding-top: 20px;
  background-color: ${LIGHT_GREY};
  height: 90px;
`;

export const FooterText = styled.p`
  font-size: 12px;
  text-align: center;
  color: ${BLACK};
`;

export const FooterButton = styled.button`
  background-color: transparent;
  padding: 0px;
  margin-top: 10px;

  font-size: 12px;
  text-align: center;
  color: ${BLACK};

  &:hover {
    background-color: transparent;
    color: ${BLUE};
  }
`;

export default FooterArea;
