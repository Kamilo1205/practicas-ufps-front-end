import { HiOutlineBuildingOffice2, HiOutlineCalendar, HiOutlineChartPie, HiOutlineFolder, HiOutlineUser, HiOutlineUsers } from 'react-icons/hi2';
import { MenuItem } from './MenuItem';
import { useAuth } from '../../../contexts';
import { roles } from '../../../interfaces/rol.interface';

export const MenuList = () => {
  //{ to: '/coordinador/documentos', text: 'Documentos', icon: HiOutlineDocumentDuplicate, roles: ['administrador', 'director-programa', 'coordinador'] },
  const { user } = useAuth();
  const rolUrl = user?.roles.find(u => u.nombre == roles.director) ?
    roles.director : roles.coordinador
  //TODO: Restringir acceso a los roles
  const navLinks = [
    { to: '/coordinador/primerospasos', text: 'Primeros pasos', icon: HiOutlineChartPie, roles: [roles.administrador,] },
    { to: '/coordinador/configuraciones', text: 'Configuraciones', icon: HiOutlineChartPie, roles: [roles.administrador,] },
    { to: '/coordinador/ARL', text: 'ARL', icon: HiOutlineChartPie, roles: [roles.administrador, roles.coordinador,] },
    { to: '/coordinador/usuarios', text: 'Usuarios', icon: HiOutlineUsers, roles: [roles.administrador] },
    { to: `/${rolUrl}/empresas`, text: 'Empresas', icon: HiOutlineBuildingOffice2, roles: [roles.administrador, roles.coordinador, roles.director] },
    { to: `/${rolUrl}/estudiantes`, text: 'Estudiantes', icon: HiOutlineUser, roles: [roles.administrador, roles.director, roles.coordinador] },
    { to: `/${rolUrl}/tutores`, text: 'Tutores', icon: HiOutlineUsers, roles: [roles.administrador, roles.director, roles.coordinador] },
    { to: `/${rolUrl}/practicas`, text: 'Practicas', icon: HiOutlineFolder, roles: [roles.administrador, roles.coordinador, roles.director] },
    { to: '/coordinador/calendario', text: 'Calendario', icon: HiOutlineCalendar, roles: [roles.administrador] },
    { to: `/${rolUrl}/reportes`, text: 'Reportes', icon: HiOutlineChartPie, roles: [roles.administrador, roles.coordinador, roles.director] },
    { to: '/empresa/tutores', text: 'Tutores', icon: HiOutlineUsers, roles: [roles.empresa] },
    { to: '/empresa/practicantes', text: 'Practicantes', icon: HiOutlineUsers, roles: [roles.empresa] },
    { to: '/empresa/solicitudes', text: 'Administración de solicitudes', icon: HiOutlineUsers, roles: [roles.empresa] },
    { to: '/estudiante', text: 'Datos personales', icon: HiOutlineUser, roles: [roles.estudiante] },
    { to: '/estudiante/plantrabajo', text: 'Plan de trabajo', icon: HiOutlineUsers, roles: [roles.estudiante] },
    { to: '/estudiante/informeparcial', text: 'Informe Parcial', icon: HiOutlineUsers, roles: [roles.estudiante] },
    { to: '/estudiante/informefinal', text: 'Informe Final', icon: HiOutlineUsers, roles: [roles.estudiante] },
    { to: '/estudiante/evaluacionestudiante', text: 'Evaluacion Estudiante', icon: HiOutlineUsers, roles: [roles.estudiante] },
    { to: '/estudiante/solicitud-cambio', text: 'Solicitudes de cambio del plan de trabajo', icon: HiOutlineUsers, roles: [roles.estudiante] },
    { to: '/tutor/perfil', text: 'Datos del tutor', icon: HiOutlineUsers, roles: [roles.tutor] },
    { to: '/tutor/practicantes', text: 'Practicantes', icon: HiOutlineUsers, roles: [roles.tutor] },
    { to: '/director/practicas', text: 'Solicitudes', icon: HiOutlineUser, roles: [roles.director] },

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
