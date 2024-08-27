import { ChangeEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoryList } from '@services/api/categoryService';

import { Category } from '@type/category';

import { createInterview } from '@services/api/InterviewService';
import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_POS, TOAST_TYPE } from '@constants/toast';
import {
  InterviewContentContainer,
  OrganizationSectionContainer,
  OrganizationSectionContainerNoBorder,
  OrganizationSectionDescription,
  OrganizationSectionTitle,
  SelectedCategoryButton,
} from './InterviewIntroPage.style';
import SelectBar from './SelectBar';
import OrganizationFooter from './OrganizationFooter';

const InterviewOrganization = () => {
  const navigate = useNavigate();
  const { notify } = useToast();

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
        .catch((error) =>
          notify({
            message: '카테고리 데이터 로딩 실패',
            description: error.message,
            type: TOAST_TYPE.ERROR,
            placement: TOAST_POS.TOP,
          }),
        );
    };
    getData();
  }, [notify]);

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
      notify({
        message: '면접 구성 실패',
        description: '카테고리를 최소 1개 이상 선택해주세요.',
        type: TOAST_TYPE.ERROR,
        placement: TOAST_POS.TOP,
      });
      return;
    }

    // todo: 카테고리 여러개 선택 가능하도록 구조 변경
    if (selectedCategoryIdList.length > 1) {
      notify({
        message: '면접 구성 실패',
        description: '현재 카테고리는 1개만 선택 가능합니다.',
        type: TOAST_TYPE.ERROR,
        placement: TOAST_POS.TOP,
      });
      return;
    }

    const promise = createInterview({ categoryIdList: selectedCategoryIdList });
    const postData = () => {
      promise
        .then((data) => data.result?.interviewCode.code)
        .then((code) => {
          notify({
            message: '면접 구성 성공',
            description: '면접 페이지로 이동합니다.',
            type: TOAST_TYPE.SUCCESS,
            placement: TOAST_POS.TOP_RIGHT,
          });
          navigate(`/interview/${code}`);
        })
        .catch((error) =>
          notify({
            message: '모의면접 생성 실패',
            description: error.message,
            type: TOAST_TYPE.ERROR,
            placement: TOAST_POS.TOP,
          }),
        );
    };
    postData();
  };

  return (
    <InterviewContentContainer>
      <OrganizationSectionContainer>
        <OrganizationSectionTitle>포트폴리오로 구성하기</OrganizationSectionTitle>
        <OrganizationSectionDescription>
          포트폴리오를 업로드하여 면접 내용을 자동으로 구성합니다.
        </OrganizationSectionDescription>
        <SelectBar
          optionList={[{ name: 'pdf, docx, hwp, txt', value: '' }]}
          value="value"
          onChange={() => null}
          text="구성하기"
          onClick={() => {
            notify({
              message: '포트폴리오 면접 구성',
              description: '현재 버전에서 지원하지 않는 기능입니다.',
              type: TOAST_TYPE.ERROR,
              placement: TOAST_POS.TOP,
            });
          }}
        />
      </OrganizationSectionContainer>
      <OrganizationSectionContainer>
        <OrganizationSectionTitle>직접 선택하여 구성하기</OrganizationSectionTitle>
        <OrganizationSectionDescription>
          기술 카테고리를 선택하여 면접 내용을 직접 구성합니다.
        </OrganizationSectionDescription>

        <SelectBar
          optionList={categoryList.map((category) => ({
            name: category.tag,
            value: String(category.id),
          }))}
          value={String(selectedCategory.id)}
          onChange={handleCategoryChange}
          text="추가하기"
          onClick={handleCategoryAddButton}
        />
      </OrganizationSectionContainer>
      <OrganizationSectionContainerNoBorder>
        <OrganizationSectionTitle>현재 면접 구성</OrganizationSectionTitle>
        <OrganizationSectionDescription>
          모의 기술 면접에서 다음과 같은 내용들이 질문으로 나올 수 있습니다.
        </OrganizationSectionDescription>
        {selectedCategoryList.map((category) => (
          <SelectedCategoryButton
            type="button"
            value={category.id}
            onClick={handleCategoryDeleteButton}
          >
            {category.tag}
          </SelectedCategoryButton>
        ))}
      </OrganizationSectionContainerNoBorder>
      <OrganizationFooter onClick={handleInterviewStartButton} />
    </InterviewContentContainer>
  );
};

export default InterviewOrganization;
