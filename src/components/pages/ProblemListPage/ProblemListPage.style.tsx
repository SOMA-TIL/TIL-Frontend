import styled from 'styled-components';

export const ProblemListContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 200px;
`;

export const SubTitle = styled.h2`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const TableContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 200px;
  background-color: #f9fafc;
  flex-grow: 1;
`;

export const TableOptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

export const OptionGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const TotalItems = styled.div`
  color: #4b4c4c;
  padding: 5px 10px;
`;

export const FavoriteButton = styled.button`
  border-radius: 5px;
  border: 1px solid #bbb;
  padding: 5px 10px;
  font-size: 15px;
  cursor: pointer;
`;

export const OrderOptionDropDown = styled.select`
  border-radius: 5px;
  border: 1px solid #bbb;
  padding: 5px 10px;
  font-size: 15px;
  cursor: pointer;
`;

export const CustomTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 8px;
  overflow: hidden;
`;

export const TableHeader = styled.thead`
  background-color: #ededff;
`;

export const TableHeaderCell = styled.th<{ align?: 'center' | 'left' | 'right' }>`
  padding: 12px 15px;
  font-weight: bold;
  text-align: ${(props) => props.align || 'center'};
  height: 60px;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #dee2e6;
  cursor: pointer;
  transition: background-color 0.2s ease;
  height: 60px;

  &:hover {
    background-color: #e9ecef;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td<{ align?: 'center' | 'left' | 'right' }>`
  text-align: ${(props) => props.align || 'center'};
  padding: 12px 15px;
  height: 60px;
`;

export const StatusText = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: bold;
`;

export const LevelText = styled.span`
  color: #4e63ed;
  font-weight: bold;
`;

export const TitleWithTags = styled.div`
  display: flex;
  align-items: center;

  & > span:first-child {
    margin-right: 10px; /* 제목과 태그 사이 간격 */
  }
`;
