import { Link, Outlet } from 'react-router-dom';
import logoUfps from '/logo-vertical.svg';

export const AuthLayout = () => {
  return (
    <div className="h-screen">
      <div className="flex p-6">
        <Link className="flex" to="/auth/login">
          <img src={logoUfps} className="size-9 rounded-sm" />
          <div className="flex justify-center flex-col ml-2">
            <div className="text-xl text-gray-900 font-bold leading-4 tracking-tight">
              Practicas
            </div>
            <span className="text-base font-normal text-gray-400">
              Ingieneria de Sistemas
            </span>
          </div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};
