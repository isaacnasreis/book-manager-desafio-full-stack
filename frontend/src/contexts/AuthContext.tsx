import { createContext, useState, useEffect, type ReactNode } from 'react';
import { api } from '../services/api';

interface AuthContextData {
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('@BookManager:token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    const response = await api.post('/auth/login', { email, password });
    const { token } = response.data;

    localStorage.setItem('@BookManager:token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsAuthenticated(true);
  }

  function signOut() {
    localStorage.removeItem('@BookManager:token');
    delete api.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
    window.location.href = '/login';
  }

  if (loading) {
    return null; // Impede renderizar as rotas até checar se existe token no local storage
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}