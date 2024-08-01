// SearchBar.tsx
import React from 'react';
import { SearchBarContainer, SearchInput } from './ProblemListPage.style';

// todo: 검색어를 입력받는 SearchBar 컴포넌트를 구현 예정.
const SearchBar: React.FC = () => (
  <SearchBarContainer>
    <SearchInput type="text" placeholder="검색어를 입력해주세요" />
  </SearchBarContainer>
);

export default SearchBar;
