import axios from 'axios';

// Use proxy in development, direct URL in production
const baseURL = import.meta.env.DEV ? '/api' : 'http://localhost:3000';

// Static files URL - adjust this based on your backend setup
export const STATIC_FILES_URL = import.meta.env.DEV 
  ? 'http://localhost:3000' // Direct access to backend for static files
  : 'http://localhost:3000'; // Your production backend URL

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth tokens here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 404) {
      console.error('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error');
    }
    return Promise.reject(error);
  }
);

export default api;