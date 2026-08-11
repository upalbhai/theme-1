import axios from 'axios';
import { store } from '@/store';
import { logout } from '@/store/auth-slice';

// Base API configuration
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: Attach auth token automatically
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle global errors (e.g., 401 auto-logout)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If the API returns a 401 Unauthorized, dispatch the logout action
    if (error.response?.status === 401) {
      store.dispatch(logout());
      // Optionally redirect to login here if not handled by a route guard
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Generic response types that match common API patterns
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      page_size: number;
      total: number;
      totalPages: number;
    }
  };
}

export default apiClient;
