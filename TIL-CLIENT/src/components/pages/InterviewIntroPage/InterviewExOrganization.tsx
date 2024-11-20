import { useNavigate } from 'react-router-dom';
import { useToast } from '@components/common/notification/ToastProvider';
import { TOAST_POS, TOAST_TYPE } from '@constants/toast';
import { useState } from 'react';
import { createInterview } from '@services/api/InterviewService';
import {
  InterviewContentContainer,
  OrganizationSectionContainer,
  OrganizationSectionContainerNoBorder,
  OrganizationSectionDescription,
  OrganizationSectionTitle,
  PortfolioBigTextArea,
  PortfolioTextArea,
} from './InterviewIntroPage.style';
import SelectBox from './SelectBox';
import OrganizationFooter from './OrganizationFooter';

const InterviewExOrganization = () => {
  const navigate = useNavigate();
  const { notify } = useToast();

  const [questionSize, setQuestionSize] = useState<number>(3);
  const [portfolioData, setPortfolioData] = useState<{ [key: string]: string }>({
    summary: '',
    stacks: '',
    contributions: '',
  });

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPortfolioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value, 10);
    setQuestionSize(val);
  };

  const handleInterviewStartButton = () => {
    if (portfolioData.summary.length <= 0) {
      notify({
        message: '면접 구성 실패',
        description: '프로젝트 개요를 입력해주세요.',
        type: TOAST_TYPE.ERROR,
        placement: TOAST_POS.TOP,
      });
      return;
    }

    if (portfolioData.stacks.length <= 0) {
      notify({
        message: '면접 구성 실패',
        description: '기술 스택을 입력해주세요.',
        type: TOAST_TYPE.ERROR,
        placement: TOAST_POS.TOP,
      });
      return;
    }

    if (portfolioData.contributions.length <= 0) {
      notify({
        message: '면접 구성 실패',
        description: '기여한 점을 입력해주세요.',
        type: TOAST_TYPE.ERROR,
        placement: TOAST_POS.TOP,
      });
      return;
    }

    const portfolio = `프로젝트 개요: ${portfolioData.summary}
    사용한 기술 스택: ${portfolioData.stacks}
    기여한 점: ${portfolioData.contributions}`;

    const promise = createInterview({
      interviewType: 'PORTFOLIO',
      categoryIdList: [],
      questionSize,
      portfolio,
    });
    const postData = () => {
      promise
        .then((data) => data.result?.interviewCode.code)
        .then((code) => {
          notify({
            message: '면접 구성 성공',
            description: '면접 페이지로 이동합니다.',
            type: TOAST_TYPE.SUCCESS,
            placement: TOAST_POS.TOP_RIGHT,
          });
          navigate(`/interview/${code}`);
        })
        .catch((error) =>
          notify({
            message: '모의면접 생성 실패',
            description: error.message,
            type: TOAST_TYPE.ERROR,
            placement: TOAST_POS.TOP,
          }),
        );
    };
    postData();
  };

  return (
    <InterviewContentContainer>
      <OrganizationSectionContainer>
        <OrganizationSectionTitle>프로젝트 개요</OrganizationSectionTitle>
        <OrganizationSectionDescription>
          진행한 프로젝트의 제목, 주제 등을 한 줄로 요약하여 입력합니다.
        </OrganizationSectionDescription>
        <PortfolioTextArea
          name="summary"
          value={portfolioData.summary}
          placeholder="프로젝트 개요를 입력하세요."
          onChange={handleTextArea}
        />
      </OrganizationSectionContainer>
      <OrganizationSectionContainer>
        <OrganizationSectionTitle>기술 스택</OrganizationSectionTitle>
        <OrganizationSectionDescription>
          프로젝트에서 사용한 기술 스택을 입력합니다.
        </OrganizationSectionDescription>
        <PortfolioTextArea
          name="stacks"
          value={portfolioData.stacks}
          placeholder="사용한 기술 스택을 입력하세요."
          onChange={handleTextArea}
        />
      </OrganizationSectionContainer>
      <OrganizationSectionContainer>
        <OrganizationSectionTitle>프로젝트에 기여한 점</OrganizationSectionTitle>
        <OrganizationSectionDescription>
          프로젝트에 기여한 점을 상세하게 입력합니다.
        </OrganizationSectionDescription>
        <PortfolioBigTextArea
          name="contributions"
          value={portfolioData.contributions}
          placeholder="기여한 점을 입력하세요."
          onChange={handleTextArea}
        />
      </OrganizationSectionContainer>
      <OrganizationSectionContainerNoBorder>
        <OrganizationSectionTitle>질문 개수 선택하기</OrganizationSectionTitle>
        <OrganizationSectionDescription>
          모의 면접의 질문 개수를 결정합니다.
        </OrganizationSectionDescription>
        <SelectBox
          optionList={Array.from({ length: 8 }, (v, i) => ({
            name: String(i + 3),
            value: String(i + 3),
          }))}
          value={String(questionSize)}
          onChange={handleQuestionSizeChange}
        />
      </OrganizationSectionContainerNoBorder>
      <OrganizationFooter onClick={handleInterviewStartButton} />
    </InterviewContentContainer>
  );
};

export default InterviewExOrganization;
