import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthStore from '@store/useAuthStore';
import { Category } from '@type/category';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { PROBLEM_LEVEL, PROBLEM_USER_STATUS } from '@constants/problem';
import { ProblemListParams } from '@services/api/problemService';
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
  categoryList: Category[];
  initSearchParam?: ProblemListParams;
}

const SearchBar: React.FC<SearchBarProps> = ({ categoryList, initSearchParam }) => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>(initSearchParam?.keyword || '');
  const [status, setStatus] = useState<string | undefined>(initSearchParam?.status);
  const [selectedLevel, setSelectedLevel] = useState<number[]>(initSearchParam?.levelList || []);
  const [selectedCategoryList, setSelectedCategoryList] = useState<number[]>(
    initSearchParam?.categoryList || [],
  );
  const { isAuthenticated, checkAuthentication } = useAuthStore();

  const handleSearch = () => {
    const params = new URLSearchParams();

    params.set('page', '1'); // 검색 시 항상 첫 페이지로 이동

    if (keyword) {
      params.set('keyword', keyword);
    }

    if (status && status.length > 0) {
      params.append('status', status);
    }

    if (selectedLevel && selectedLevel.length > 0) {
      selectedLevel.forEach((l) => params.append('level', l.toString()));
    }

    if (selectedCategoryList && selectedCategoryList.length > 0) {
      selectedCategoryList.forEach((c) => params.append('category', c.toString()));
    }
    if (initSearchParam?.isFavorite) {
      params.set('isFavorite', 'true');
    }

    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const handleReset = () => {
    setKeyword('');
    setStatus(undefined);
    setSelectedLevel([]);
    setSelectedCategoryList([]);
    handleSearch();
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
    <SearchBarContainer>
      <SearchInput
        placeholder="풀고 싶은 문제의 제목을 검색하세요."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        prefix={<SearchOutlined />}
      />
      {isAuthenticated && (
        <StatusSelect value={status} onChange={handleStatusChange} placeholder="상태 선택">
          <Option value="">전체</Option>
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
  );
};

export default SearchBar;
