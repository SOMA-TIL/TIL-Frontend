import { ChangeEvent, useState, useEffect, useRef } from 'react';

import { getCategoryList } from '@services/api/categoryService';
import SelectBox, { Option } from '@components/layout/SelectBox/SelectBox';

import { Category } from '@type/category';

const InterviewOrganization = () => {
  const categoryList = useRef<Category[]>([]);
  const nameList = useRef<Option[]>([]);

  const [topicList, setTopicList] = useState<Option[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>({ name: '', topic: '' });
  const [selectedCategoryList, setSelectedCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    const promise = getCategoryList();
    const getData = () => {
      promise
        .then((data) => {
          const result = data.result?.categoryList as Category[];
          categoryList.current = result;
        })
        .then(() => {
          const uniqueNameList = categoryList.current
            .map((category) => {
              const option: Option = {
                name: category.name,
                value: category.name,
              };
              return option;
            })
            .filter(
              (item, i) =>
                categoryList.current.findIndex((item2) => item.name === item2.name) === i,
            );

          nameList.current = uniqueNameList;
        })
        .then(() => {
          setSelectedCategory({
            name: nameList.current[0].name,
            topic: '',
          });

          return nameList.current[0].name;
        })
        .then((curName) => {
          const uniqueTopicList = categoryList.current
            .filter((category) => curName === category.name)
            .map((category) => {
              const option: Option = {
                name: category.topic,
                value: category.topic,
              };
              return option;
            });

          setTopicList(uniqueTopicList);

          return { curName, uniqueTopicList };
        })
        .then(({ curName, uniqueTopicList }) => {
          setSelectedCategory({
            name: curName,
            topic: uniqueTopicList[0].name,
          });
        });
    };
    getData();
  }, []);

  const handleNameChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLOptionElement;

    const uniqueTopicList = categoryList.current
      .filter((category) => value === category.name)
      .map((category) => {
        const option: Option = {
          name: category.topic,
          value: category.topic,
        };
        return option;
      });

    setTopicList(uniqueTopicList);

    setSelectedCategory({
      name: value,
      topic: uniqueTopicList[0].name,
    });
  };

  const handleTopicChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLOptionElement;
    setSelectedCategory({
      ...selectedCategory,
      topic: value,
    });
  };

  const handleCategoryAddButton = () => {
    const newCategory: Category = { ...selectedCategory };

    if (!newCategory.name || !newCategory.topic) return;

    if (
      !selectedCategoryList.find(
        (category) => JSON.stringify(category) === JSON.stringify(newCategory),
      )
    )
      setSelectedCategoryList([...selectedCategoryList, newCategory]);
  };

  const handleCategoryDeleteButton = (e: React.MouseEvent) => {
    const { innerText } = e.target as HTMLButtonElement;
    const temp = innerText.split(' - ');
    const deleteCategory: Category = { name: temp[0], topic: temp[1] };

    setSelectedCategoryList(
      selectedCategoryList.filter(
        (category) => JSON.stringify(category) !== JSON.stringify(deleteCategory),
      ),
    );
  };

  const handleInterviewStartButton = () => {
    // console.log(selectedCategoryList);
    // todo: selectedCategoryList 정보를 서버에 전달해서 모의 면접을 시작한다.
    // 모의 면접을 생성하는 POST API
    // 이후 해당 면접 화면으로 이동
    // PGR 패턴
  };

  return (
    <div className="InterviewOrganization">
      <br />
      <h1>직접 선택하여 구성하기</h1>
      <p>기술 카테고리를 선택하여 면접 내용을 직접 구성합니다.</p>

      <SelectBox
        optionList={nameList.current}
        value={selectedCategory.name}
        onChange={handleNameChange}
      />
      <SelectBox
        optionList={topicList}
        value={selectedCategory.topic}
        onChange={handleTopicChange}
      />

      <button type="button" onClick={handleCategoryAddButton}>
        추가하기
      </button>

      <br />
      <br />
      <br />

      <h1>현재 면접 구성</h1>
      <p>모의 기술 면접에서 다음과 같은 내용들이 질문으로 나올 수 있습니다.</p>
      <div className="CategoryList">
        {selectedCategoryList.map((category) => (
          <button type="button" onClick={handleCategoryDeleteButton}>
            {category.name} - {category.topic}
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
