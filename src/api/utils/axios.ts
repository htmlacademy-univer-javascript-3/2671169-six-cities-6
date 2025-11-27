import axios from 'axios';

const api = axios.create({
  baseURL: 'https://14.design.htmlacademy.pro/six-cities',
  responseType: 'json',
  timeout: 5000,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // eslint-disable-next-line no-console
      console.warn('Unauthorized — 401');
    }

    return Promise.reject(error);
  }
);

export default api;
