import React from 'react';

import BasicPageLayout from '@components/layout/BasicPageLayout';
import { Banner, BannerContainer } from './MainPage.style';

const MainPage: React.FC = () => (
  <BasicPageLayout showFooter>
    <BannerContainer>
      <Banner src="images/banner.png" alt="banner" />
    </BannerContainer>
  </BasicPageLayout>
);

export default MainPage;
