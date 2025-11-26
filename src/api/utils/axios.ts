import axios from 'axios';

const api = axios.create({
  baseURL: 'https://14.design.htmlacademy.pro/six-cities',
  responseType: 'json',
  timeout: 5000,
});

export default api;
