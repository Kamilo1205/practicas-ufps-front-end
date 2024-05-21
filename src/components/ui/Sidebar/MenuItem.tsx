import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../contexts';

interface MenuItemProps {
  to: string;
  text: string;
  icon: React.ComponentType<{ size: number; className: string }>;
  roles: string[];
}

export const MenuItem: React.FC<MenuItemProps> = ({ to, text, icon: Icon, roles }) => {
  const { user } = useAuth();
  const userHasAccess = roles.some(rol => user?.roles.some(userRol => userRol.nombre === rol));
  
  return userHasAccess ? (
    <li>
     <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center gap-x-3 text-gray-700 leading-6 font-semibold 
           text-sm p-2 no-underline rounded-md hover:text-indigo-600 group
           ${isActive && "text-indigo-600 bg-gray-50 is-active"}`
        }
      >
        {Icon && <Icon className="group-hover:text-indigo-600 group-[.is-active]:text-indigo-600 text-gray-400" size={24} />}
        { text }
      </NavLink>
    </li>
  ) : null;
};
