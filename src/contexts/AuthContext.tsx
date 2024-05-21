import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { fetchGetUsuarioPerfil } from '../api/auth.api';
import { Usuario } from '../interfaces';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  user: Usuario | null;
  login: (userData: Usuario) => void;
  signup: (userData: Usuario) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode; // Aquí especificamos que children debe ser de tipo ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isLoading, setLoading] = useState<boolean>(true);

  const login = async(usuario: Usuario) => {
    setUser(usuario);
  };

  const logout = async() => {
    setLoading(true);
    setUser(null);
    setLoading(false);
  };

  const signup = async(usuario: Usuario) => {
    setUser(usuario);
  }

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const usuario = await fetchGetUsuarioPerfil();
        setUser(usuario);
        setLoading(false);
      } catch (error) {
        setUser(null);
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  const isAuthenticated = user !== null;

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    signup,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
