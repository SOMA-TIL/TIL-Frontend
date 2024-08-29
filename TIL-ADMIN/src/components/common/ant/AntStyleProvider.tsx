import React from 'react';
import { ConfigProvider } from 'antd';
import { LIGHT_PURPLE, PRIMARY_PURPLE } from '@styles/pallete';

interface StyledConfigProviderProps {
  children: React.ReactNode;
}

const StyledConfigProvider: React.FC<StyledConfigProviderProps> = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: PRIMARY_PURPLE, // 기본 주요 색상
        controlItemBgActive: LIGHT_PURPLE, // 선택된 항목의 배경색
        controlItemBgHover: LIGHT_PURPLE, // 항목에 마우스를 올렸을 때의 배경색
      },
    }}
  >
    {children}
  </ConfigProvider>
);

export default StyledConfigProvider;
