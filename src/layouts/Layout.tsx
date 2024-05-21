import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { Sidebar } from '../components/ui/Sidebar/Sidebar';
import { SidebarOvers } from '../components/ui/Sidebar';
import { Avatar } from '../components/ui';
import { useAuth } from '../contexts';

export const Layout = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="overflow-x-hidden">
      <Sidebar />
      <SidebarOvers open={open} setOpen={setOpen} />
      <div className="flex justify-between items-center gap-x-6 z-10 sticky top-0 p-4 ring-0 ring-offset-0 sm:px-6 lg:hidden">
        <button type="button" onClick={() => setOpen((value) => !value)} className="lg:hidden text-gray-700 p-2.5 -m-2.5">
          <HiBars3 className="w-6 h-6"/>
        </button>
        <div>
          <button className="flex items-center p-1.5 -m-1.5">
            <span className="hidden md:flex text-gray-900 leading-6 font-semibold text-sm mr-4">{ user?.displayName }</span>
            <div className="w-9 h-9">
              <Avatar url={user?.imagenUrl}/>
            </div>
          </button>
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
