'use client';

import React from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  loading: boolean;
  login: (email: string, password: string, portalType: string) => Promise<void>;
  register: (name: string, email: string, password: string, portalType: 'admin' | 'user') => Promise<void>;
  logout: () => void;
  clearError: () => void;
  error?: string;
}

const mockUser = {
  id: 1,
  name: 'Sarah Jenkins',
  email: 'sarah@example.com',
  user_type: 'admin',
  role: {
    name: 'Super Admin',
    permissions: [{ name: 'manage_projects' }]
  }
};

export function useAuth(): AuthContextType {
  return {
    isAuthenticated: true,
    user: mockUser,
    loading: false,
    login: async () => {},
    register: async () => {},
    logout: () => {},
    clearError: () => {}
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default useAuth;
