import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { fetchGetUsuarioPerfil, fetchPostUsuarioLogin, fetchPostUsuarioLogout } from '../api/auth.api';
import { Usuario } from '../interfaces';
import { LoginSchema } from '../schemas';

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

  const login = async(credentials: LoginSchema) => {
    try {
      const response = await fetchPostUsuarioLogin(credentials)
      setUser(response.usuario);
    } catch (error) {
      throw error; // Lanza el error para que el componente que llama pueda manejarlo
    }
  };

  const logout = async() => {
    try {
      setLoading(true);
      await fetchPostUsuarioLogout();
      setUser(null);
    } catch (error) {
      throw error; // Lanza el error para que el componente que llama pueda manejarlo
    } finally {
      setLoading(false);
    }
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
