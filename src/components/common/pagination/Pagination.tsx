import React from 'react';
import { PaginationContainer, PaginationButton } from './Pagination.style';

const Pagination: React.FC<{
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalItems, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(
        <PaginationButton key={i} active={i === currentPage} onClick={() => onPageChange(i)}>
          {i}
        </PaginationButton>,
      );
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <PaginationButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        이전
      </PaginationButton>

      {renderPageNumbers()}

      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
