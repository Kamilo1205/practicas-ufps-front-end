import { FC, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { HiArrowLeftStartOnRectangle } from 'react-icons/hi2';
import { CgProfile } from 'react-icons/cg';

import { MenuList } from './MenuList';
import { Avatar } from '../Avatar/Avatar';
import { useAuth } from '../../../contexts';
import { Logo } from '../../logo';

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {}

export const Sidebar: FC<SidebarProps> = () => {
  const { user, logout } = useAuth();

  return (
    <div className="hidden lg:flex lg:flex-col lg:w-72 lg:z-10 lg:fixed lg:inset-y-0">
      <div className="flex flex-col flex-grow gap-y-5 px-6 border-r border-gray-200 overflow-y-auto">
        <div className="flex flex-col pt-6 pb-4 items-start text-base font-semibold flex-shrink-0">
          <Logo to="/"/>
        </div>

        <nav className="flex flex-column flex-1">
          <ul className="flex flex-col flex-1 gap-y-7">
            <li>
              <MenuList />
            </li>
            <li className="mt-auto -mx-6">
              <Menu>
                <MenuButton className="flex w-full items-center gap-3 py-3 px-6 text-gray-900 leading-6 font-semibold text-sm">
                  <div className="w-9">
                    <Avatar url={user?.imagenUrl} />
                  </div>
                  {user?.displayName}
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
                        <CgProfile className="w-5 h-5 text-gray-400/90"/>
                        Ver perfil
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button 
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3"
                        onClick={logout} 
                      >
                        <HiArrowLeftStartOnRectangle className="w-5 h-5 text-gray-400/90"/>
                        Cerrar sesión
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
