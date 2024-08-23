import React, { useEffect, useState } from 'react';
import useAuthStore from '@store/useAuthStore';
import { Category } from '@type/category';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import StyledConfigProvider from '@components/common/ant/AntStyleProvider';
import { PROBLEM_LEVEL, PROBLEM_USER_STATUS } from '@constants/problem';
import {
  SearchBarContainer,
  SearchInput,
  StatusSelect,
  LevelSelect,
  CategorySelect,
  SearchButton,
  ResetButton,
} from './SearchBar.style';

const { Option } = StatusSelect;

interface SearchBarProps {
  onSearch: (keyword: string, status: string, level: number[], category: number[]) => void;
  categoryList: Category[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, categoryList }) => {
  const [keyword, setKeyword] = useState('');
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [selectedLevel, setSelectedLevel] = useState<number[] | undefined>(undefined);
  const [selectedCategoryList, setSelectedCategoryList] = useState<number[]>([]);
  const { isAuthenticated, checkAuthentication } = useAuthStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const handleSearch = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: any = { keyword, status, level: selectedLevel, category: selectedCategoryList };
    onSearch(params.keyword, params.status, params.level, params.category);
  };

  const handleReset = () => {
    setKeyword('');
    setStatus(undefined);
    setSelectedLevel([]);
    setSelectedCategoryList([]);
    onSearch('', '', [], []); // 모든 검색 조건을 빈 값으로 전달하여 초기화
  };

  const handleStatusChange = (value: unknown) => {
    setStatus(value as string);
  };

  const handleLevelChange = (value: unknown) => {
    setSelectedLevel(value as number[]);
  };
  const handleCategoryChange = (values: unknown) => {
    setSelectedCategoryList(values as number[]);
  };

  return (
    <StyledConfigProvider>
      <SearchBarContainer>
        <SearchInput
          placeholder="풀고 싶은 문제의 제목을 검색하세요."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          prefix={<SearchOutlined />}
        />
        {isAuthenticated && (
          <StatusSelect value={status} onChange={handleStatusChange} placeholder="상태 선택">
            <Option value={PROBLEM_USER_STATUS.PASS}>PASS</Option>
            <Option value={PROBLEM_USER_STATUS.FAIL}>FAIL</Option>
            <Option value={PROBLEM_USER_STATUS.NOT_ATTEMPTED}>시도하지 않은 문제</Option>
          </StatusSelect>
        )}
        <LevelSelect
          mode="multiple"
          value={selectedLevel?.sort((a, b) => a - b)}
          onChange={handleLevelChange}
          placeholder="난이도 선택"
          hasStatus={isAuthenticated}
        >
          {Object.values(PROBLEM_LEVEL).map((level) => (
            <Option key={level} value={level}>
              Lv.{level}
            </Option>
          ))}
        </LevelSelect>
        <CategorySelect
          mode="multiple"
          value={selectedCategoryList}
          onChange={handleCategoryChange}
          placeholder="기술 카테고리 선택"
        >
          {categoryList.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.tag}
            </Option>
          ))}
        </CategorySelect>
        <SearchButton onClick={handleSearch}>
          검색하기
          <SearchOutlined className="icon" />
        </SearchButton>
        <ResetButton onClick={handleReset}>
          <ReloadOutlined />
        </ResetButton>
      </SearchBarContainer>
    </StyledConfigProvider>
  );
};

export default SearchBar;
