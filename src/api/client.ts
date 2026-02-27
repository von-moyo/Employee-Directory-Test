import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const message =
        error.response.data?.message ?? 'An unexpected error occurred';
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(
        new Error('Network error. Please check your connection.'),
      );
    }
    return Promise.reject(error);
  },
);
