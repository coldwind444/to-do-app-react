import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createApiWithToken = (token : string) => {
  const api = axios.create({
    baseURL: baseApi.defaults.baseURL,
    headers: {
      ...baseApi.defaults.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return api;
};

export default baseApi;
