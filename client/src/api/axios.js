import axios from 'axios';
import baseUrl from '../constants/baseUrl';
import store from '../store/store';

const api = axios.create({
  baseURL: `${baseUrl}/api`
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
