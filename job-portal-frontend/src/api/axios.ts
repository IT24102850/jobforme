import axios from 'axios';

const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? 'http://localhost:8081';

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const stored = localStorage.getItem('jobportal-auth');
  if (stored) {
    try {
      const { token } = JSON.parse(stored) as { token: string };
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      localStorage.removeItem('jobportal-auth');
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Surface network failures in the console to aid debugging.
    if (!error.response) {
      console.error('API network error:', error);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
