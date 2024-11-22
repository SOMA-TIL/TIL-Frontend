import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { AlignType } from 'rc-table/lib/interface';
import { useToast } from '@components/common/notification/ToastProvider';
import { getProblemSubmitHistory } from '@services/api/problemService';
import { TOAST_TYPE } from '@constants/toast';
import { getGradingResultColor } from '@constants/grading';
import { ProblemHistoryInfo, ProblemSubmitHistoryInfo } from '@type/problem';
import formatDate from '@utils/time';
import { getErrorMessage } from '@utils/errorHandler';
import { Container, SolutionBox, StyledTable, SubTitleBox } from './ProblemHistoryTab.style';

const CAN_NOT_VIEW_SOLUTION = '문제를 PASS해야 솔루션을 볼 수 있습니다.';

const createColumnSetting = (
  title: string,
  dataIndex: string,
  width: number,
  render?: (text: string) => React.ReactNode,
  align: AlignType = 'left',
) => ({
  title,
  dataIndex,
  key: dataIndex,
  width,
  align,
  render: render || ((text: string) => text),
});

const columns: TableColumnsType<ProblemHistoryInfo> = [
  createColumnSetting(
    '결과',
    'result',
    80,
    (text) => (
      <span style={{ color: getGradingResultColor(text), fontWeight: 'bold', fontSize: '30px' }}>
        {text === 'PASS' ? '🥰' : '😓'}
      </span>
    ),
    'center',
  ),
  createColumnSetting('답변', 'answer', 300),
  createColumnSetting('피드백', 'comment', 300),
  createColumnSetting('제출 날짜', 'submittedDate', 150),
];

const ProblemHistory: React.FC<{ problemId: string }> = ({ problemId }) => {
  const { notify } = useToast();
  const [submitHistory, setSubmitHistory] = useState<ProblemSubmitHistoryInfo | null>(null);
  useEffect(() => {
    const fetchSubmitHistoryData = async () => {
      try {
        const response = await getProblemSubmitHistory(problemId);
        setSubmitHistory(response.result || null);
      } catch (err) {
        notify({
          message: '답변 기록 로딩 실패',
          description: getErrorMessage(err),
          type: TOAST_TYPE.ERROR,
        });
      }
    };

    fetchSubmitHistoryData();
  }, [problemId, notify]);

  const dataSource = (submitHistory?.submitHistory || []).map((history, index) => ({
    ...history,
    submittedDate: formatDate(history.submittedDate, 'YYYY-MM-DD'),
    key: index,
  }));

  return (
    <Container>
      <SubTitleBox>모범 답안</SubTitleBox>
      <SolutionBox>
        <p>{submitHistory?.solution || CAN_NOT_VIEW_SOLUTION}</p>
      </SolutionBox>
      <SubTitleBox>답변 기록</SubTitleBox>
      <StyledTable>
        <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ y: 400 }} />
      </StyledTable>
    </Container>
  );
};

export default ProblemHistory;
