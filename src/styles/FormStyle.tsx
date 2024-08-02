import styled from 'styled-components';
import { PRIMARY_PURPLE } from './pallete';
import { Input } from './InputStyle';

const Form = styled.form`
  display: flex;
  flex-direction: column; /* 세로 방향으로 정렬 */
  align-items: center;
`;

export const FormSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

export const FormSectionTitle = styled.label`
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
`;

export const FormTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
`;

export const FormInput = styled(Input)`
  margin-bottom: 5px;
`;

export const FormInputError = styled.p`
  width: 100%;
  height: 14px;
  justify-content: flex-start;
  margin-top: 2px;
  margin-bottom: 18px;
  padding-left: 4px;
  font-size: 14px;
  color: ${PRIMARY_PURPLE};
`;

export default Form;
