import { useState } from 'react';

import TabButton from '@components/layout/TabButton/TabButton';
import InterviewOrganization from '@components/pages/InterviewIntroPage/InterviewOrganization';
import InterviewHistory from '@components/pages/InterviewIntroPage/InterviewHistory';
import BasicPageLayout from '@components/layout/BasicPageLayout';

import './InterviewIntroPage.css';

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
    InterviewHistory: <InterviewHistory />,
  };

  return (
    <BasicPageLayout>
      <div className="InterviewIntroPage">
        <div>
          <TabButton
            name="InterviewOrganization"
            text="모의 면접 구성하기"
            selected={selectedTab}
            onClick={handleClickTabButton}
          />
          <TabButton
            name="InterviewHistory"
            text="내 모의 면접 기록"
            selected={selectedTab}
            onClick={handleClickTabButton}
          />
        </div>
        {contents[selectedTab]}
      </div>
    </BasicPageLayout>
  );
};

export default InterviewIntroPage;
