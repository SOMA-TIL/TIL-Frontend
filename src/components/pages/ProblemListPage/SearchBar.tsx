// SearchBar.tsx
import React from 'react';
import { SearchBarContainer, SearchInput, Select, SearchButton } from './SearchBar.style';

const SearchBar: React.FC = () => (
  <SearchBarContainer>
    <SearchInput type="text" placeholder="검색어를 입력해주세요" />
    <Select>
      <option value="">상태 선택</option>
      <option value="pass">Pass</option>
      <option value="fail">Fail</option>
      <option value="incomplete">Incomplete</option>
    </Select>
    <Select>
      <option value="">난이도 선택</option>
      <option value="1">Lv.1</option>
      <option value="2">Lv.2</option>
      <option value="3">Lv.3</option>
    </Select>
    <Select>
      <option value="">기술 카테고리 선택</option>
      <option value="network">네트워크</option>
      <option value="os">운영체제</option>
      <option value="db">데이터베이스</option>
    </Select>
    <SearchButton>검색하기</SearchButton>
  </SearchBarContainer>
);

export default SearchBar;
