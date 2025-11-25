import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types/convoy';
import { mockUser } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthorized: (requiredRole: string[]) => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in production, this would call a real API
    if (email && password.length >= 6) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(mockUser);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const isAuthorized = useCallback((requiredRoles: string[]): boolean => {
    if (!user) return false;
    return requiredRoles.includes(user.role);
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAuthorized,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
