import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { UserType, User } from '../types';
let AsyncStorage: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  AsyncStorage = null;
  console.warn('AsyncStorage not available; install @react-native-async-storage/async-storage for persistence.');
}

import { mockCustomers, mockHairdressers } from '../data/mockData';

type AuthContextValue = {
  user: User | null;
  userType: UserType | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  switchUserType: (type: UserType) => void;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'app_auth_user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        if (AsyncStorage) {
          const raw = await AsyncStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            setUser(parsed.user || null);
            setUserType(parsed.userType || null);
          }
        }
      } catch (err) {
        console.warn('Failed to load auth', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  const persist = async (u: User | null, t: UserType | null) => {
    if (AsyncStorage) {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ user: u, userType: t }));
      } catch (err) {
        console.warn('Failed to persist auth', err);
      }
    }
  };

  const login = async (email: string, password: string) => {
    // Simple mock login against mock data (passwords are 'password' for demo users)
    const cust = mockCustomers.find(c => c.email === email);
    if (cust && password === 'password') {
      setUser(cust);
      setUserType('customer');
      await persist(cust, 'customer');
      return true;
    }
    const hd = mockHairdressers.find(h => h.email === email);
    if (hd && password === 'password') {
      setUser(hd);
      setUserType('hairdresser');
      await persist(hd, 'hairdresser');
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    setUserType(null);
    if (AsyncStorage) {
      try {
        await AsyncStorage.removeItem(STORAGE_KEY);
      } catch (err) {
        console.warn('Failed to clear auth', err);
      }
    }
  };

  const switchUserType = (type: UserType) => {
    setUserType(type);
    // keep current user object; in a real app you'd refresh or fetch role-specific data
  };

  return (
    <AuthContext.Provider value={{ user, userType, isLoading, login, logout, switchUserType }}>
      {children}
    </AuthContext.Provider>
  );
};
