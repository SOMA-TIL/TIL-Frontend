import React, { useEffect, useState } from 'react';
import { getProblemList } from '@services/api/problemService';
import { ProblemListInfo } from '@type/problem';
import { Pagination, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { ProblemPageContainer, SubTitle } from './ProblemListPage.style';
import SearchBar from './SearchBar';

const columns: ColumnsType<ProblemListInfo> = [
  {
    title: '상태',
    key: 'status',
    render: () => <span>Perfect</span>,
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '카테고리',
    dataIndex: 'categoryName',
    key: 'categoryName',
    render: (text) => <span>{text || 'None'}</span>,
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
  const [problemList, setProblemList] = useState<ProblemListInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblemList = async () => {
      try {
        const response = await getProblemList();
        setProblemList(response.result?.items || []);
      } catch (err) {
        setError('An error occurred while fetching problems.');
      } finally {
        setLoading(false);
      }
    };

    fetchProblemList();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    // todo: 검색, 페이징, 상세화면 라우팅 가능 추가 예정
    <ProblemPageContainer>
      <SubTitle>기술학습</SubTitle>
      <SearchBar />
      {problemList.length === 0 ? (
        <div>문제가 없습니다.</div>
      ) : (
        <>
          <Table columns={columns} dataSource={problemList} rowKey="id" pagination={false} />
          <Pagination align="center" defaultCurrent={1} total={50} />
        </>
      )}
    </ProblemPageContainer>
  );
};

export default ProblemListPage;
