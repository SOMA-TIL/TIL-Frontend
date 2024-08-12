import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { ProblemHistoryInfo } from '@type/problem';
import { Container, SolutionBox, StyledTable, SubTitleBox } from './ProblemHistoryTab.style';

interface ProblemHistoryProps {
  isPassed: boolean;
  problemSolution: string;
  historyData: ProblemHistoryInfo[];
}

const columns: TableColumnsType<ProblemHistoryInfo> = [
  {
    title: '답변',
    dataIndex: 'answer',
    key: 'answer',
    width: 300,
  },
  {
    title: '피드백',
    dataIndex: 'feedback',
    key: 'feedback',
    width: 300,
  },
  {
    title: '제출 날짜',
    dataIndex: 'created_date',
    key: 'created_date',
    width: 150,
  },
  {
    title: '결과',
    dataIndex: 'score',
    key: 'score',
    width: 100,
  },
];

const ProblemHistory: React.FC<ProblemHistoryProps> = ({
  problemSolution,
  historyData,
  isPassed,
}) => {
  const dataSource = historyData.map((item) => ({
    key: item.id,
    ...item,
  }));

  return (
    <Container>
      <SubTitleBox>모범 답안</SubTitleBox>
      <SolutionBox>
        {isPassed ? <p>{problemSolution}</p> : <p>문제를 PASS해야 솔루션을 볼 수 있습니다.</p>}
      </SolutionBox>
      <SubTitleBox>답변 기록</SubTitleBox>
      <StyledTable>
        <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ y: 400 }} />
      </StyledTable>
    </Container>
  );
};

export default ProblemHistory;
