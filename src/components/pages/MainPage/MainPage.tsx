import React from 'react';
import { Banner, MainPageLayout } from './MainPage.style';

const MainPage: React.FC = () => (
  <MainPageLayout>
    <Banner src="images/banner.png" alt="banner" />
  </MainPageLayout>
);

export default MainPage;
