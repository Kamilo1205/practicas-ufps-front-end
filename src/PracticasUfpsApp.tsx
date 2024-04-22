import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes/AppRouter';
import { AuthProvider } from './contexts/auth/AuthContext';

export const PracticasUfpsApp = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}
