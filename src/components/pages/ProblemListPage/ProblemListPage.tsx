import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BasicPageLayout from '@components/layout/BasicPageLayout';
import useCategoryStore from '@store/useCategoryStore';
import { getProblemList } from '@services/api/problemService';
import { ProblemOverviewInfo } from '@type/problem';
import { Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ProblemPageContainer, SubTitle } from './ProblemListPage.style';
import SearchBar from './SearchBar';

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { getCategoryList } = useCategoryStore();

  useEffect(() => {
    const fetchProblemList = async () => {
      try {
        await getCategoryList();
        const response = await getProblemList();
        setProblemList(response.result?.problemList || []);
      } catch (err) {
        setError('An error occurred while fetching problems.');
      } finally {
        setLoading(false);
      }
    };

    fetchProblemList();
  }, [getCategoryList]);

  const onRowClick = (record: ProblemOverviewInfo) => {
    navigate(`/problem/${record.id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <BasicPageLayout>
      <ProblemPageContainer>
        <SubTitle>기술학습</SubTitle>
        <SearchBar />
        {problemList.length === 0 ? (
          <div>문제가 없습니다.</div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={problemList}
              rowKey="id"
              pagination={false}
              onRow={(record) => ({
                onClick: () => onRowClick(record),
              })}
            />
            <Pagination align="center" defaultCurrent={1} total={50} />
          </>
        )}
      </ProblemPageContainer>
    </BasicPageLayout>
  );
};

export default ProblemListPage;
