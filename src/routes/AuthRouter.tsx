import { Navigate, Route, Routes } from 'react-router-dom';
import { ForgotPassword, LoginPage, RegistroPage, PasswordReset } from '../pages/auth';
import { AuthLayout } from '../layouts/AuthLayout';

export const AuthRouter = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index path="login" element={<LoginPage />} />
        <Route path="registro" element={<RegistroPage />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<PasswordReset />} />
        <Route path="*" element={<Navigate to="/auth/login" replace={true} />} />
      </Route>
    </Routes>
  )
}
