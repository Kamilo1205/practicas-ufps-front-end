import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';

export const AuthRouter = () => {
  return (
    <Routes>
        <Route index path='/login' element={<LoginScreen />} />
        <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  )
}
