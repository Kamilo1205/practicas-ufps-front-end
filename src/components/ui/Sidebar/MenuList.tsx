import { HiOutlineBuildingOffice2, HiOutlineCalendar, HiOutlineChartPie, HiOutlineFolder, HiOutlineUser, HiOutlineUsers } from 'react-icons/hi2';
import { MenuItem } from './MenuItem';
import { useAuth } from '../../../contexts';

export const MenuList = () => {
  //{ to: '/coordinador/documentos', text: 'Documentos', icon: HiOutlineDocumentDuplicate, roles: ['administrador', 'director-programa', 'coordinador'] },
  const { user } = useAuth();

  const rolUrl = user?.roles.find(u => u.nombre == 'director-programa') ?
    'director' : 'coordinador'
//TODO: Restringir acceso a los roles
  const navLinks = [
    { to: '/coordinador/primerospasos', text: 'Primeros pasos', icon: HiOutlineChartPie, roles: ['administrador', 'coordinador',] },
    { to: '/coordinador/configuraciones', text: 'Configuraciones', icon: HiOutlineChartPie, roles: ['administrador','coordinador'] },
    { to: '/coordinador/ARL', text: 'ARL', icon: HiOutlineChartPie, roles: ['administrador', 'coordinador',] },
    { to: '/coordinador/usuarios', text: 'Usuarios', icon: HiOutlineUsers, roles: ['administrador'] },
    { to: `/${rolUrl}/empresas`, text: 'Empresas', icon: HiOutlineBuildingOffice2, roles: ['administrador', 'coordinador', 'director-programa'] },
    { to: `/${rolUrl}/estudiantes`, text: 'Estudiantes', icon: HiOutlineUser, roles: ['administrador', 'director-programa', 'coordinador'] },
    { to: `/${rolUrl}/tutores`, text: 'Tutores', icon: HiOutlineUsers, roles: ['administrador', 'director-programa', 'coordinador'] },
    { to: `/${rolUrl}/practicas`, text: 'Practicas', icon: HiOutlineFolder, roles: ['administrador', 'coordinador'] },
    { to: '/coordinador/calendario', text: 'Calendario', icon: HiOutlineCalendar, roles: ['administrador', 'coordinador'] },
    { to: `/${rolUrl}/reportes`, text: 'Reportes', icon: HiOutlineChartPie, roles: ['administrador', 'coordinador','director-programa'] },
    { to: '/empresa/tutores', text: 'Tutores', icon: HiOutlineUsers, roles: ['empresa'] },
    { to: '/empresa/practicantes', text: 'Practicantes', icon: HiOutlineUsers, roles: ['empresa'] },
    { to: '/empresa/solicitudes', text: 'Administración de solicitudes', icon: HiOutlineUsers, roles: ['empresa'] },
    { to: '/estudiante', text: 'Datos personales', icon: HiOutlineUser, roles: ['estudiante'] },
    { to: '/estudiante/plantrabajo', text: 'Plan de trabajo', icon: HiOutlineUsers, roles: ['estudiante'] },
    { to: '/tutor/perfil', text: 'Datos del tutor', icon: HiOutlineUsers, roles: ['tutor'] },
    { to: '/tutor/practicantes', text: 'Practicantes', icon: HiOutlineUsers, roles: ['tutor'] },
    { to: '/director/practicas' ,text: 'Solicitudes', icon: HiOutlineUser, roles: ['director-programa']},

  ];       

  return (
    //<nav className="flex flex-column flex-1">
      //<ul className="flex flex-col flex-1 gap-y-7">
        //<li>
          <ul className="-mx-2">
            {
              user && navLinks.map((link, index) => (
                <MenuItem
                  key={index}
                  icon={link.icon}
                  roles={link.roles}
                  text={link.text}
                  to={link.to}
                />
              ))
            }
          </ul>
        //</li>
      //</ul>
    //</nav>
  );
};
