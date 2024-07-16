import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
