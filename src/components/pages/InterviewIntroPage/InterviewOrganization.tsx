import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryList } from '@services/api/categoryService';
import SelectBox from '@components/layout/SelectBox/SelectBox';

import { Category } from '@type/category';
import { showAlertPopup } from '@utils/showPopup';

import { createInterview } from '@services/api/InterviewService';

const InterviewOrganization = () => {
  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>({ id: -1, tag: '' });
  const [selectedCategoryList, setSelectedCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    const promise = getCategoryList();
    const getData = () => {
      promise
        .then((data) => {
          const result = data.result?.categoryList as Category[];
          setCategoryList(result);
          return result;
        })
        .then((result) => {
          setSelectedCategory(result[0]);
        })
        .catch((error) => showAlertPopup(error.message));
    };
    getData();
  }, []);

  const handleCategoryChange = (e: ChangeEvent) => {
    const { selectedOptions } = e.target as HTMLSelectElement;
    setSelectedCategory({ id: Number(selectedOptions[0].value), tag: selectedOptions[0].text });
  };

  const handleCategoryAddButton = () => {
    const newCategory: Category = { id: selectedCategory.id, tag: selectedCategory.tag };

    if (newCategory.id === -1 || !newCategory.tag) return;

    if (
      selectedCategoryList.find(
        (category) => JSON.stringify(category) === JSON.stringify(newCategory),
      )
    )
      return;

    setSelectedCategoryList([...selectedCategoryList, newCategory]);
  };

  const handleCategoryDeleteButton = (e: React.MouseEvent) => {
    const { value, innerText } = e.target as HTMLButtonElement;
    const deleteCategory: Category = { id: Number(value), tag: innerText };

    setSelectedCategoryList(
      selectedCategoryList.filter(
        (category) => JSON.stringify(category) !== JSON.stringify(deleteCategory),
      ),
    );
  };

  const handleInterviewStartButton = () => {
    const selectedCategoryIdList: number[] = selectedCategoryList.map((category) => category.id);

    if (!selectedCategoryIdList.length) {
      showAlertPopup('카테고리를 최소 1개 이상 선택해주세요.');
      return;
    }

    // todo: 카테고리 여러개 선택 가능하도록 구조 변경
    if (selectedCategoryIdList.length > 1) {
      showAlertPopup('베타 버전에서 카테고리는 1개만 선택 가능합니다.');
      return;
    }

    const promise = createInterview({ categoryIdList: selectedCategoryIdList });
    const postData = () => {
      promise
        .then((data) => {
          const uuid = data.result?.interviewUuid.uuid;
          return uuid;
        })
        .then((uuid) => {
          navigate(`/interview/${uuid}`);
        })
        .catch((error) => showAlertPopup(error.message));
    };
    postData();
  };

  return (
    <div className="InterviewOrganization">
      <br />
      <h1>직접 선택하여 구성하기</h1>
      <p>기술 카테고리를 선택하여 면접 내용을 직접 구성합니다.</p>

      <SelectBox
        optionList={categoryList.map((category) => ({
          name: category.tag,
          value: String(category.id),
        }))}
        value={String(selectedCategory.id)}
        onChange={handleCategoryChange}
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
          <button type="button" value={category.id} onClick={handleCategoryDeleteButton}>
            {category.tag}
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
