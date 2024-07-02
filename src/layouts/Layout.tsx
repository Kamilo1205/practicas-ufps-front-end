import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { HiArrowLeftStartOnRectangle, HiBars3 } from 'react-icons/hi2';
import { Sidebar } from '../components/ui/Sidebar/Sidebar';
import { SidebarOvers } from '../components/ui/Sidebar';
import { Avatar } from '../components/ui';
import { useAuth } from '../contexts';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { CgProfile } from 'react-icons/cg';

import { roles } from '../interfaces/rol.interface';
import { useConfigNotificaciones } from '../hooks/useConfigNotificaciones';




export const Layout = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  useConfigNotificaciones()

  return (
    <div className="overflow-x-hidden">

      <Sidebar />
      <SidebarOvers open={open} setOpen={setOpen} />
      <div className="flex justify-between items-center gap-x-6 z-10 sticky top-0 p-4 ring-0 ring-offset-0 sm:px-6 lg:hidden">
        <button type="button" onClick={() => setOpen((value) => !value)} className="lg:hidden text-gray-700 p-2.5 -m-2.5">
          <HiBars3 className="w-6 h-6" />
        </button>
        <div>
          <Menu>
            <MenuButton className="flex items-center p-1.5 -m-1.5">
              <span className="hidden md:flex text-gray-900 leading-6 font-semibold text-sm mr-4">{user?.displayName}</span>
              <div className="w-9 h-9">
                <Avatar url={user?.imagenUrl} />
              </div>
            </MenuButton>
            <Transition
              enter="transition ease-out duration-75"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <MenuItems
                anchor="top"
                className="w-64 z-10 rounded-md border border-gray-200 py-2 px-1 bg-white text-sm [--anchor-gap:var(--spacing-1)] focus:outline-none"
              >
                <MenuItem>
                  <Link to={'perfil'} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3">
                    <CgProfile className="w-5 h-5 text-gray-400/90" />
                    Ver perfil
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                    onClick={logout}
                  >
                    <HiArrowLeftStartOnRectangle className="w-5 h-5 text-gray-400/90" />
                    Cerrar sesión
                  </button>
                </MenuItem>
              </MenuItems>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="lg:pl-72">
        <div className="px-9 sm:px-14 lg:px-20 pt-8 pb-20">
          <Outlet />
        </div>
      </div>

    </div>
  );
}
