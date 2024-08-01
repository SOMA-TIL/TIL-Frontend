import React, { useEffect, useState } from 'react';
import { getProblemList } from '@services/api/problemService';
import { Problem } from '@type/problem';
import { ProblemPageContainer, ProblemsList, ProblemItem } from './ProblemListPage.style';
import SearchBar from './SearchBar';

const ProblemListPage: React.FC = () => {
  const [problemList, setProblemList] = useState<Problem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await getProblemList();
        if (response.status.code === 'SUCCESS_GET_PROBLEM_LIST' && response.result) {
          setProblemList(response.result.items);
        } else {
          setError(`Failed to fetch problems. Status code: ${response.status.code}`);
        }
      } catch (err) {
        setError('An error occurred while fetching problems.');
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    // todo: ProblemListPage 컴포넌트 스타일링 구현 예정 & 입력 시 상세화면 이동 추가 예정
    <ProblemPageContainer>
      <SearchBar />
      <h1>기술학습</h1>
      <ProblemsList>
        {problemList &&
          problemList.map((problem) => (
            <ProblemItem key={problem.id}>
              <span>Perfect</span>
              <span className="title">{problem.title}</span>
              <span className="category">{problem.categoryName || '네트워크'}</span>
              <span className="level">Lv.{problem.level}</span>
              <span className="solved">{problem.solved}명</span>
              <span className="percentage">{problem.percentage}%</span>
            </ProblemItem>
          ))}
      </ProblemsList>
    </ProblemPageContainer>
  );
};

export default ProblemListPage;
