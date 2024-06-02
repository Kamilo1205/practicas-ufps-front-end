import { Outlet } from 'react-router-dom';
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2';

import { Logo } from '../components/logo';
import { Button } from '../components/ui';
import { useAuth } from '../contexts';
import { useEffect } from 'react';

export const RegistroLayout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
      alert('vas a salir');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <div className="flex bg-white border-b border-gray-100 sticky top-0 z-10 justify-between p-6">
        <Logo />
        <div>
          <Button className="gap-x-2" onClick={logout} variant='outline'>
            <HiArrowLeftStartOnRectangle className="w-5 h-5"/>
            <div className="hidden sm:block">Cerrar sesión</div>
          </Button>
        </div>
      </div>
    
      <div className="py-10 px-12 sm:py-11 sm:px-20">
        <Outlet />
      </div>
    </div>
  );
}
