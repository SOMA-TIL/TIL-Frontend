import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BasicPageLayout from '@components/layout/BasicPageLayout';
import Loading from '@components/common/loading/Loading';
import { getGradingResultColor } from '@constants/grading';
import useLoadingStore from '@store/useLoadingStore';
import useCategoryStore from '@store/useCategoryStore';
import useAuthStore from '@store/useAuthStore';
import { getProblemList, ProblemListParams } from '@services/api/problemService';
import { ProblemOverviewInfo } from '@type/problem';
import { CategoryTag } from '@styles/TagStyle';
import { BookMarkSmallIcon } from '@styles/IconSvgStyle';
import Pagination from '@components/common/pagination/Pagination';
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
  const { isAuthenticated } = useAuthStore();
  const [problemList, setProblemList] = useState<ProblemOverviewInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(7);
  const [totalItems, setTotalItems] = useState<number>(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { getCategoryList, categoryList } = useCategoryStore();
  const { getIsLoading, setIsLoading } = useLoadingStore();
  const [initSearchParam, setInitSearchParam] = useState<ProblemListParams | null>();

  const getFavoriteParam = () => {
    const params = new URLSearchParams(location.search);
    return Boolean(params.get('isFavorite'));
  };

  const fetchProblemList = useCallback(async () => {
    try {
      setIsLoading(true);
      await getCategoryList();

      const params = new URLSearchParams(location.search);
      const searchParams: ProblemListParams = {
        keyword: params.get('keyword') || undefined,
        status: params.get('status') || undefined,
        levelList: params.getAll('level').map(Number),
        categoryList: params.getAll('category').map(Number),
        page: parseInt(params.get('page') || '1', 10) - 1,
        size: pageSize,
        isFavorite: Boolean(params.get('isFavorite')) || undefined,
      };

      setInitSearchParam(searchParams);

      const response = await getProblemList(searchParams);

      setProblemList(response.result?.problemList || []);
      setTotalItems(response.result?.pageInfo.totalItems || 0);
    } catch (err) {
      setError('An error occurred while fetching problems.');
    } finally {
      setIsLoading(false);
    }
  }, [location.search, pageSize, getCategoryList, setIsLoading]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    setCurrentPage(page);
  }, [location.search]);

  useEffect(() => {
    fetchProblemList();
  }, [currentPage, location.search, fetchProblemList]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', page.toString());
    navigate(`?${params.toString()}`);
  };

  const handleClickFavorite = () => {
    if (!isAuthenticated) {
      return;
    }

    const params = new URLSearchParams(location.search);
    if (params.get('isFavorite') === 'true') {
      params.delete('isFavorite');
    } else {
      params.set('isFavorite', 'true');
    }
    navigate(`?${params.toString()}`);
  };

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
          <SearchBar categoryList={categoryList} initSearchParam={initSearchParam || undefined} />
        </SearchBarContainer>
        <TableContentContainer>
          <TableOptionContainer>
            <OptionGroup>
              <TotalItems>{totalItems} 문제</TotalItems>
              <FavoriteButton disabled={!isAuthenticated} onClick={handleClickFavorite}>
                <BookMarkSmallIcon isFavorite={getFavoriteParam()} disable={!isAuthenticated} />{' '}
                즐겨찾기
              </FavoriteButton>
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
                  <TableHeaderCell width="100px">상태</TableHeaderCell>
                  <TableHeaderCell width="15px" style={{ padding: 0 }} />
                  <TableHeaderCell align="left">제목</TableHeaderCell>
                  <TableHeaderCell width="180px">난이도</TableHeaderCell>
                  <TableHeaderCell width="180px">완료한 사람</TableHeaderCell>
                  <TableHeaderCell width="180px">정답률</TableHeaderCell>
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
                      <TableCell style={{ padding: 0 }}>
                        {problem.userStatus?.isFavorite ? (
                          <BookMarkSmallIcon isFavorite={problem.userStatus.isFavorite} />
                        ) : null}
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
                      <TableCell>
                        {problem.finishCount !== undefined
                          ? problem.finishCount.toLocaleString('ko-KR')
                          : '0'}
                        명
                      </TableCell>
                      <TableCell>{problem.passRate}%</TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </CustomTable>
              <Pagination
                currentPage={currentPage}
                totalItems={totalItems}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </TableContentContainer>
      </ProblemListContainer>
    </BasicPageLayout>
  );
};

export default ProblemListPage;
