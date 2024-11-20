import { useState } from 'react';

import InterviewOrganization from '@components/pages/InterviewIntroPage/InterviewOrganization';
import InterviewExOrganization from '@components/pages/InterviewIntroPage/InterviewExOrganization';
import BasicPageLayout from '@components/layout/BasicPageLayout';

import SubHeader from './SubHeader';
import { InterviewIntroContainer } from './InterviewIntroPage.style';

interface Content {
  [key: string]: React.ReactElement;
}

const InterviewIntroPage = () => {
  const [selectedTab, setSelectedTab] = useState('InterviewOrganization');

  const handleClickTabButton = (e: React.MouseEvent) => {
    const { name } = e.target as HTMLButtonElement;
    setSelectedTab(name);
  };

  const contents: Content = {
    // 전환할 탭에서 보여줄 콘텐츠 컴포넌트 목록
    InterviewOrganization: <InterviewOrganization />,
    InterviewExOrganization: <InterviewExOrganization />,
  };

  return (
    <BasicPageLayout>
      <InterviewIntroContainer>
        <SubHeader selected={selectedTab} onClick={handleClickTabButton} />
        {contents[selectedTab]}
      </InterviewIntroContainer>
    </BasicPageLayout>
  );
};

export default InterviewIntroPage;
