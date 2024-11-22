import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlignType } from 'rc-table/lib/interface';
import { Table, TableColumnsType } from 'antd';

import Loading from '@components/common/loading/Loading';
import BasicPageLayout from '@components/layout/BasicPageLayout';
import { INTERVIEW_STATUS } from '@constants/interview';
import { getInterviewResult, getIntreviewStatus } from '@services/api/InterviewService';

import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_TYPE } from '@constants/toast';
import { getGradingResultColor } from '@constants/grading';
import { GradingResultWithProblemInfo } from '@type/grading';
import { PRIMARY_PURPLE } from '@styles/pallete';
import {
  InterviewResultContainer,
  TableContentContainer,
  SubTitle,
} from './InterviewResultPage.style';

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

const columns: TableColumnsType<{ result: string; info: string }> = [
  createColumnSetting(
    '결과',
    'result',
    80,
    (text) => (
      <span style={{ color: getGradingResultColor(text), fontWeight: 'bold', fontSize: '50px' }}>
        {text}
      </span>
    ),
    'center',
  ),
  createColumnSetting('정보', 'info', 600, (text) => (
    // eslint-disable-next-line react/no-danger
    <div dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} />
  )),
];

// const countingResult = (data: GradingResultWithProblemInfo[], result: string) =>
//   data.filter((r) => r.result === result).length;

// const accracyRate = (data: GradingResultWithProblemInfo[]) =>
//   (countingResult(data, 'PASS') / data.length) * 100;

const InterviewResultPage: React.FC = () => {
  const INTERVAL_REFRESH_TIME = 1500;
  const { code } = useParams<{ code: string }>();
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [gradingResult, setGradingResult] = useState<GradingResultWithProblemInfo[] | undefined>(
    undefined,
  );
  const { notify } = useToast();

  useEffect(() => {
    const intervalStatusCheck = setInterval(async () => {
      if (loadingStatus) {
        const response = await getIntreviewStatus(code as string);

        if (response.result?.status !== INTERVIEW_STATUS.PENDING) {
          setLoadingStatus(false);
          clearInterval(intervalStatusCheck);
        }
      }
    }, INTERVAL_REFRESH_TIME);
    return () => {
      clearInterval(intervalStatusCheck);
    };
  }, [code, loadingStatus]);

  useEffect(() => {
    const fetchInterviewResult = async () => {
      try {
        const response = await getInterviewResult(code as string);
        if (response.result?.interviewStatus === INTERVIEW_STATUS.DONE) {
          setGradingResult(response.result?.gradingResult || []);
        }
      } catch (error) {
        notify({
          message: '면접 결과 로딩 실패',
          description: '면접 결과를 불러오지 못했습니다.',
          type: TOAST_TYPE.ERROR,
        });
      }
    };
    if (!loadingStatus && !gradingResult) {
      fetchInterviewResult();
    }
  }, [code, loadingStatus, gradingResult, notify]);

  const dataSource = (gradingResult || []).map((data, index) => ({
    key: index + 1,
    result: data.result === 'PASS' ? '🥰' : '😓',
    info: `질문 : ${data.question}\n제출 : ${data.userAnswer}\n피드백 : ${data.comment}`,
  }));

  if (loadingStatus) {
    return <Loading />;
  }

  return (
    <BasicPageLayout>
      <InterviewResultContainer>
        <SubTitle>
          모의면접 결과
          {gradingResult && (
            <span
              style={{
                color: PRIMARY_PURPLE,
                fontWeight: 'bold',
                paddingLeft: '20px',
                fontSize: '18px',
              }}
            >
              {/* 정답률 :{' '}
              {accracyRate(gradingResult) % 1 === 0
                ? accracyRate(gradingResult).toFixed(0)
                : accracyRate(gradingResult).toFixed(1)}
              % */}
            </span>
          )}
        </SubTitle>
        <TableContentContainer>
          <Table columns={columns} dataSource={dataSource} pagination={false} />
        </TableContentContainer>
      </InterviewResultContainer>
    </BasicPageLayout>
  );
};

export default InterviewResultPage;
