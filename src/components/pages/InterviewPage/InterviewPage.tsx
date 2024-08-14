import MinimalPageLayout from '@components/layout/MinimalPageLayout';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_POS, TOAST_TYPE } from '@constants/toast';
import { getInterviewInfo } from '@services/api/InterviewService';
import InterviewHeader from './InterviewHeader';
import InterviewFooter from './InterviewFooter';
import InterviewMain from './InterviewMain';
import InterviewInfo from './InterviewInfo';

const InterviewPage: React.FC = () => {
  const { notify } = useToast();

  const { code } = useParams<{ code: string }>();

  useEffect(() => {
    const promise = getInterviewInfo(code as string);
    const getData = () => {
      promise
        .then(
          (data) =>
            // console.log(data);
            // todo: 데이터 가져와서 세팅
            data,
        )
        .catch((error) =>
          notify({
            message: '모의면접 데이터 로딩 실패',
            description: error.message,
            type: TOAST_TYPE.ERROR,
            placement: TOAST_POS.TOP,
          }),
        );
    };
    getData();
  }, [code, notify]);

  // InterviewHeader: 면접 종료(조기 종료)

  // InterviewInfo: 면접 정보 받아오기

  // InterviewMain ...

  // InterviewFooter: 남은시간, 스킵, 초기화, 제출 (Form 이벤트)

  return (
    <MinimalPageLayout>
      <InterviewHeader />
      <InterviewInfo />
      <InterviewMain />
      <InterviewFooter />
    </MinimalPageLayout>
  );
};

export default InterviewPage;
