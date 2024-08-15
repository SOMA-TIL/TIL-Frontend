import styled from 'styled-components';
import { Input as AntInput, Select as AntSelect, Button as AntButton } from 'antd';
import { PRIMARY_PURPLE, PRIMARY_PURPLE_BOLD } from '@styles/pallete';

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 0px;
  background-color: #fff;
  margin-bottom: 20px;
  flex-wrap: nowrap;
`;

export const SearchInput = styled(AntInput)`
  flex: 0 1 100%;
  height: 48px;
  border-radius: 10px 0px 0px 10px;

  .ant-input-prefix {
    margin-right: 8px;
    color: #999;
  }
`;

export const StatusSelect = styled(AntSelect)`
  flex: 0 1 40%;
  height: 48px;

  .ant-select-selector {
    display: flex;
    align-items: center;
    height: 100%;
    border-radius: 0px;
  }
`;

export const LevelSelect = styled(AntSelect)<{ hasStatus: boolean }>`
  flex: ${(props) => (props.hasStatus ? '0 1 40%' : '0 1 30%')};
  height: 48px;

  .ant-select-selector {
    display: flex;
    align-items: center;
    height: 100%;
    border-radius: 0px;
  }
`;

export const CategorySelect = styled(AntSelect)`
  flex: 0 1 50%;
  height: 48px;

  .ant-select-selector {
    display: flex;
    align-items: center;
    height: 100%;
    border-radius: 0px;
  }
`;

export const SearchButton = styled(AntButton)`
  flex: 0 1 9%;
  flex-shrink: 0;
  background-color: ${PRIMARY_PURPLE};
  height: 48px;
  color: white;
  font-size: 16px;
  border-radius: 0px 10px 10px 0px;
  border: none;
  cursor: pointer;

  &.ant-btn:hover {
    background-color: ${PRIMARY_PURPLE_BOLD} !important;
    color: white !important;
  }
  .icon {
    margin-left: 8px;
  }
`;
