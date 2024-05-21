import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppRouter } from './routes/AppRouter';
import { AuthProvider } from './contexts';

export const PracticasUfpsApp = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
        <Toaster position="top-center" richColors/>
      </AuthProvider>
    </BrowserRouter>
  );
}
