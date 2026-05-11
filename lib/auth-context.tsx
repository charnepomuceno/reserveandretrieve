'use client';

import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'admin' | 'osa-staff' | 'org-officer' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface MockUser {
  email: string;
  password: string;
  id: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database - In production, this would be a real backend
const MOCK_USERS: MockUser[] = [
  {
    email: 'osa@adnu.edu.ph',
    password: 'admin123',
    id: 'user-1',
    name: 'OSA Administrator',
    role: 'admin',
  },
  {
    email: 'osa@adnu.edu.ph',
    password: 'staff123',
    id: 'user-2',
    name: 'OSA Staff',
    role: 'osa-staff',
  },
  {
    email: 'tactics_org@adnu.edu.ph',
    password: 'officer123',
    id: 'user-3',
    name: 'TACTICS Organization',
    role: 'org-officer',
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const mockUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (mockUser) {
      setUser({
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
      });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
