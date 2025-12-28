import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080',
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

export default apiClient;
