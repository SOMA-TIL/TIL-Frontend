import axios from 'axios';

export const getErrorMessage = (err: unknown): string => {
  if (axios.isAxiosError(err)) {
    return err.response?.data.status.message || 'API 요청 중 오류가 발생했습니다.';
  }
  if (err instanceof Error) {
    return err.message || '예상치 못한 오류가 발생했습니다.';
  }
  return '알 수 없는 오류가 발생했습니다.';
};

export const alertError = (err: unknown) => {
  const errorMessage = getErrorMessage(err);
  // eslint-disable-next-line
  alert(errorMessage);
};
