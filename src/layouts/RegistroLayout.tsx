import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2';

import { Logo } from '../components/logo';
import { Button } from '../components/ui';
import { useAuth } from '../contexts';

export const RegistroLayout = () => {
  const { logout } = useAuth();
  const logoutRef = useRef(logout);

  useEffect(() => {
    logoutRef.current = logout;
  }, [logout]);

  useEffect(() => {
    const incrementTabCount = () => {
      let tabCount = parseInt(sessionStorage.getItem('tabCount') || '0', 10);
      sessionStorage.setItem('tabCount', (tabCount + 1).toString());
      console.log('Incremented tabCount:', tabCount + 1);
    };

    const decrementTabCount = () => {
      let tabCount = parseInt(sessionStorage.getItem('tabCount') || '0', 10);
      tabCount = tabCount > 0 ? tabCount - 1 : 0;
      sessionStorage.setItem('tabCount', tabCount.toString());
      console.log('Decremented tabCount:', tabCount);

      if (tabCount <= 0) {
        localStorage.setItem('logout', Date.now().toString());
      }
    };

    incrementTabCount();

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      console.log('handleBeforeUnload event triggered');
      event.preventDefault();
      event.returnValue = ''; // Esta línea es necesaria para algunos navegadores
    };

    const handleUnload = (event: Event) => {
      console.log('handleUnload event triggered');
      decrementTabCount();
    };

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'logout') {
        logoutRef.current();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('storage', handleStorageEvent);
      decrementTabCount(); // Asegura que se decremente el contador de pestañas al desmontar el componente
    };
  }, []);
  
  return (
    <div className="min-h-screen">
      <div className="flex bg-white justify-between p-6">
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
