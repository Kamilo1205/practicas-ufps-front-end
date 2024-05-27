import { Outlet } from 'react-router-dom';
import { Logo } from '../components/logo';

export const AuthLayout = () => {
  return (
    <div className="h-screen">
      <div className="flex p-6">
        <Logo to="/auth/login" />
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};
