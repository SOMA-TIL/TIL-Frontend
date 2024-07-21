import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_TIL_API_URL, // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
