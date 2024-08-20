import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicPageLayout from '@components/layout/BasicPageLayout';
import Loading from '@components/common/loading/Loading';
import { getGradingResultColor } from '@constants/grading';
import useLoadingStore from '@store/useLoadingStore';
import useCategoryStore from '@store/useCategoryStore';
import { getProblemList, ProblemListParams } from '@services/api/problemService';
import { ProblemOverviewInfo } from '@type/problem';
import { CategoryTag } from '@styles/TagSTyle';
import {
  ProblemListContainer,
  SubTitle,
  CustomTable,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  StatusText,
  SearchBarContainer,
  TableContentContainer,
  TableOptionContainer,
  TotalItems,
  FavoriteButton,
  OrderOptionDropDown,
  OptionGroup,
  LevelText,
} from './ProblemListPage.style';
import SearchBar from './SearchBar';

const ProblemListPage: React.FC = () => {
  const [problemList, setProblemList] = useState<ProblemOverviewInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  // const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [levelList, setLevelList] = useState<number[]>([]);
  const navigate = useNavigate();
  const { getCategoryList, categoryList } = useCategoryStore();
  const { getIsLoading, setIsLoading } = useLoadingStore();

  const fetchProblemList = async (params: ProblemListParams = {}) => {
    try {
      setIsLoading(true);
      await getCategoryList();
      const response = await getProblemList({ ...params, page: currentPage });
      setProblemList(response.result?.problemList || []);
      setTotalItems(response.result?.pageInfo.totalItems || 0);
      const uniqueLevels = Array.from(
        new Set(response.result?.problemList.map((problem) => problem.level)) || [],
      );
      setLevelList(uniqueLevels);
    } catch (err) {
      setError('An error occurred while fetching problems.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProblemList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategoryList, setIsLoading, currentPage]);

  const handleSearch = (
    keyword: string,
    status: string,
    level: number | '',
    category: number[],
  ) => {
    const params: Partial<ProblemListParams> = { keyword, status };
    if (level !== '') params.level = level;
    if (category.length > 0) params.categoryList = category.map(String);

    setCurrentPage(1);
    fetchProblemList(params);
  };

  // const handlePageChange = (pagination: TablePaginationConfig) => {
  //   setCurrentPage(pagination.current || 1);
  //   setPageSize(pagination.pageSize || 10);
  // };

  const onRowClick = (record: ProblemOverviewInfo) => {
    navigate(`/problem/${record.id}`);
  };

  if (getIsLoading()) {
    return <Loading />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <BasicPageLayout>
      <ProblemListContainer>
        <SearchBarContainer>
          <SubTitle>기술 학습</SubTitle>
          <SearchBar onSearch={handleSearch} levelList={levelList} categoryList={categoryList} />
        </SearchBarContainer>
        <TableContentContainer>
          <TableOptionContainer>
            <OptionGroup>
              <TotalItems>{totalItems} 문제</TotalItems>
              <FavoriteButton>즐겨찾기</FavoriteButton>
            </OptionGroup>
            <OptionGroup>
              <OrderOptionDropDown> </OrderOptionDropDown>
            </OptionGroup>
          </TableOptionContainer>
          {problemList.length === 0 ? (
            <div>문제가 없습니다.</div>
          ) : (
            <>
              <CustomTable>
                <TableHeader>
                  <TableHeaderCell>상태</TableHeaderCell>
                  <TableHeaderCell align="left">제목</TableHeaderCell>
                  <TableHeaderCell>난이도</TableHeaderCell>
                  <TableHeaderCell>완료한 사람</TableHeaderCell>
                  <TableHeaderCell>정답률</TableHeaderCell>
                </TableHeader>
                <tbody>
                  {problemList.map((problem) => (
                    <TableRow key={problem.id} onClick={() => onRowClick(problem)}>
                      <TableCell>
                        {problem.userStatus && problem.userStatus.isAttempted
                          ? (() => {
                              const gradingResult = problem.userStatus.isPassed ? 'PASS' : 'FAIL';
                              return (
                                <StatusText color={getGradingResultColor(gradingResult)}>
                                  {gradingResult}
                                </StatusText>
                              );
                            })()
                          : null}
                      </TableCell>
                      <TableCell align="left">
                        {problem.title}
                        {problem.categoryList.map((categoryId) => {
                          const category = categoryList.find((c) => c.id === categoryId);
                          return category ? (
                            <CategoryTag key={category.id} tagColor={category.color}>
                              {category.tag}
                            </CategoryTag>
                          ) : null;
                        })}
                      </TableCell>
                      <TableCell>
                        <LevelText>{`Lv.${problem.level}`}</LevelText>
                      </TableCell>
                      <TableCell>{problem.finishCount.toLocaleString('ko-KR')}명</TableCell>
                      <TableCell>{problem.passRate}%</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </CustomTable>
              {/* //todo: pagination 추가 예정 */}
              {/* <PaginationContainer> */}
              {/* <button>이전</button>
              <span>1</span>
              <button>다음</button> */}
              {/* </PaginationContainer> */}
            </>
          )}
        </TableContentContainer>
      </ProblemListContainer>
    </BasicPageLayout>
  );
};

export default ProblemListPage;
