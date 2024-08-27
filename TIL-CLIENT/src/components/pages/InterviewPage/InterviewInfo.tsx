import { Category } from '@type/category';
import {
  InterviewInfoCategory,
  InterviewInfoContainer,
  InterviewInfoDescription,
  InterviewInfoTitle,
} from './InterviewInfo.style';

interface InterviewInfoProps {
  code: string;
  createdDate: string;
  categoryList: Category[];
  categoryIdList: number[];
}

const InterviewInfo: React.FC<InterviewInfoProps> = ({
  code,
  createdDate,
  categoryList,
  categoryIdList,
}) => (
  <InterviewInfoContainer>
    {/* todo: Date 데이터 일관성있게 사용하도록 수정하기 */}
    <InterviewInfoTitle>[{createdDate}] 모의 기술 면접</InterviewInfoTitle>
    {categoryList.map((category) =>
      categoryIdList.includes(category.id) ? (
        <InterviewInfoCategory>{category.tag}</InterviewInfoCategory>
      ) : null,
    )}
    <InterviewInfoDescription>면접 ID: {code}</InterviewInfoDescription>
  </InterviewInfoContainer>
);
export default InterviewInfo;
