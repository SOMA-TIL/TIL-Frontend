import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicPageLayout from '@components/layout/BasicPageLayout';
import Loading from '@components/common/loading/Loading';
import useLoadingStore from '@store/useLoadingStore';
import useCategoryStore from '@store/useCategoryStore';
import { getProblemList, ProblemListParams } from '@services/api/problemService';
import { ProblemOverviewInfo } from '@type/problem';
import { Table } from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { ProblemPageContainer, SubTitle } from './ProblemListPage.style';
import SearchBar from './SearchBar';

// to-do. 페이징 & 검색 상태 저장
const columns: ColumnsType<ProblemOverviewInfo> = [
  {
    title: '상태',
    key: 'status',
    render: () => <span>Pass</span>,
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '카테고리',
    dataIndex: 'categoryList',
    key: 'categoryList',
    render: (categoryIds) => {
      const { transformCategoryTagList } = useCategoryStore.getState();
      return <span>{transformCategoryTagList(categoryIds).join(',')}</span>;
    },
  },
  {
    title: '난이도',
    dataIndex: 'level',
    key: 'level',
    render: (level) => <span>Lv.{level}</span>,
  },
  {
    title: '완료한 사람',
    dataIndex: 'solved',
    key: 'solved',
    render: (solved) => <span>{solved}명</span>,
  },
  {
    title: '정답률',
    dataIndex: 'percentage',
    key: 'percentage',
    render: (percentage) => <span>{percentage}%</span>,
  },
];

const ProblemListPage: React.FC = () => {
  const [problemList, setProblemList] = useState<ProblemOverviewInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [levelList, setLevelList] = useState<number[]>([]);
  const navigate = useNavigate();
  const { getCategoryList, categoryList } = useCategoryStore();
  const { getIsLoading, setIsLoading } = useLoadingStore();

  const fetchProblemList = async (params: ProblemListParams = {}) => {
    try {
      setIsLoading(true);
      await getCategoryList();
      const response = await getProblemList({ ...params, page: currentPage, size: pageSize });
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
  }, [getCategoryList, setIsLoading, currentPage, pageSize]);

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

  const handlePageChange = (pagination: TablePaginationConfig) => {
    setCurrentPage(pagination.current || 1);
    setPageSize(pagination.pageSize || 10);
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
      <ProblemPageContainer>
        <SubTitle>기술학습</SubTitle>
        <SearchBar onSearch={handleSearch} levelList={levelList} categoryList={categoryList} />
        {problemList.length === 0 ? (
          <div>문제가 없습니다.</div>
        ) : (
          <Table
            columns={columns}
            dataSource={problemList}
            rowKey="id"
            pagination={{
              align: 'center',
              current: currentPage,
              pageSize,
              total: totalItems,
              showSizeChanger: true,
            }}
            onChange={(page) => handlePageChange(page)}
            onRow={(record) => ({
              onClick: () => onRowClick(record),
            })}
          />
        )}
      </ProblemPageContainer>
    </BasicPageLayout>
  );
};

export default ProblemListPage;
