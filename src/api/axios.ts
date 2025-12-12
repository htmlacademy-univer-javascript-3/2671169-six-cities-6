import axios from 'axios';

const api = axios.create({
  baseURL: 'https://14.design.htmlacademy.pro/six-cities',
  responseType: 'json',
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // eslint-disable-next-line no-console
      console.warn('Unauthorized — 401');
    } else if (axios.isAxiosError(error) && error.response?.status === 404) {
      window.location.href = '/*';
    }

    return Promise.reject(error);
  }
);

export default api;
