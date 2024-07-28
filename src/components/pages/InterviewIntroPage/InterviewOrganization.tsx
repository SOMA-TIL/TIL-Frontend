import { ChangeEvent, useState } from 'react';

import SelectBox from '@components/layout/SelectBox/SelectBox';

interface Content {
  category: string;
  topic: string;
}

const InterviewOrganization = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedContentList, setSelectedContentList] = useState<Content[]>([]);

  const categoryList = [
    { value: '', name: '-- 카테고리 선택 --' },
    { value: '네트워크', name: '네트워크' },
    { value: '데이터베이스', name: '데이터베이스' },
  ];

  const topicList = [
    { value: '', name: '-- 주제 선택 --' },
    { value: 'HTTP', name: 'HTTP' },
    { value: 'JPA', name: 'JPA' },
  ];

  const handleCategoryChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLOptionElement;
    setSelectedCategory(value);
    // todo: 첫번째 SelectBox 값에 따라서 두번째 Topic SelectBox를 변경한다.
  };

  const handleTopicChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLOptionElement;
    setSelectedTopic(value);
  };

  const handleContentAddButton = () => {
    const newContent: Content = {
      category: selectedCategory,
      topic: selectedTopic,
    };

    if (!newContent.category || !newContent.topic) return;

    if (
      !selectedContentList.find((content) => JSON.stringify(content) === JSON.stringify(newContent))
    )
      setSelectedContentList([...selectedContentList, newContent]);
  };

  const handleContentDeleteButton = (e: React.MouseEvent) => {
    const { innerText } = e.target as HTMLButtonElement;
    const temp = innerText.split(' - ');
    const deleteContent: Content = { category: temp[0], topic: temp[1] };

    setSelectedContentList(
      selectedContentList.filter(
        (content) => JSON.stringify(content) !== JSON.stringify(deleteContent),
      ),
    );
  };

  const handleInterviewStartButton = () => {
    // todo: selectedContentList 정보를 서버에 전달해서 모의 면접을 시작한다.
    // console.log(selectedContentList);
  };

  return (
    <div className="InterviewOrganization">
      <br />
      <h1>직접 선택하여 구성하기</h1>
      <p>기술 카테고리를 선택하여 면접 내용을 직접 구성합니다.</p>

      <SelectBox
        optionList={categoryList}
        value={selectedCategory}
        onChange={handleCategoryChange}
      />
      <SelectBox optionList={topicList} value={selectedTopic} onChange={handleTopicChange} />

      <button type="button" onClick={handleContentAddButton}>
        추가하기
      </button>

      <br />
      <br />
      <h1>현재 면접 구성</h1>
      <p>모의 기술 면접에서 다음과 같은 내용들이 질문으로 나올 수 있습니다.</p>
      <div className="ContentList">
        {selectedContentList.map((content) => (
          <button type="button" onClick={handleContentDeleteButton}>
            {content.category} - {content.topic}
          </button>
        ))}
      </div>
      <button type="button" onClick={handleInterviewStartButton}>
        모의 면접 시작하기
      </button>
    </div>
  );
};

export default InterviewOrganization;
