import styled from 'styled-components';
import { PRIMARY_PURPLE, WHITE } from './pallete';

export const Tag = styled.span<{ tagColor?: string }>`
  display: inline-block;
  background-color: ${(props) => props.tagColor || PRIMARY_PURPLE};
  color: ${WHITE};
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: semi-bold;
  margin-right: 8px;
`;

export const CategoryTag = styled.span<{ tagColor?: string }>`
  display: inline-block;
  background-color: ${(props) => props.tagColor || PRIMARY_PURPLE};
  color: ${WHITE};
  padding: 5px 10px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: semi-bold;
  margin-right: 8px;

  &:first-child {
    margin-left: 18px;
  }
`;
