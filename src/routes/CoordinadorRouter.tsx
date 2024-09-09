import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../layouts/Layout';


import { ConfiguracionRouter } from './ConfiguracionRouter';

import { UsuariosPage } from '../pages/coordinador/UsuariosPage';
import { EmpresaPage } from '../pages/coordinador/EmpresasPage';
import { EstudiantesPage } from '../pages/coordinador/EstudiantesPage';
import { DocumentosPage } from '../pages/coordinador/DocumentosPage';
import { CalendarioPage } from '../pages/coordinador/CalendarioPage';
import { PracticasPage } from '../pages/coordinador/PracticasPage';
import { GestionTutoresPage } from '../pages/coordinador/GestionTutoresPage';
import { ConfiguracionesPage } from '../pages/coordinador/ConfiguracionPage';
import { ArlPage } from '../pages/coordinador/ArlPage';
import { IntroduccionPage } from '../pages/coordinador/IntroduccionPage';
import { ReportesPage } from '../pages/coordinador/ReportesPage';
import { Usuario } from '../interfaces';
import { roles } from '../interfaces/rol.interface';
//import { roles } from '../interfaces/rol.interface';

interface CoordinadorRouterProps {
  user: Usuario;
}

export const CoordinadorRouter = ({ user }: CoordinadorRouterProps) => {

  const rolesUser = user.roles.map(rol => rol.nombre);

  return (
    <Routes>
      <Route element={<Layout />}>
        {rolesUser.includes(roles.administrador) && <Route path='/primerospasos' element={<IntroduccionPage />} />}
        <Route path='configuraciones' element={<ConfiguracionesPage />} />
        <Route path='ARL' element={<ArlPage />} />

        <Route path='empresas' element={<EmpresaPage />} />
        <Route path='estudiantes' element={<EstudiantesPage />} />
        <Route path='documentos' element={<DocumentosPage />} />
        <Route path='calendario' element={<CalendarioPage />} />
        <Route path='configuracion/*' element={<ConfiguracionRouter />} />
        <Route path='practicas' element={<PracticasPage />} />
        <Route path='tutores' element={<GestionTutoresPage />} />
        <Route path='configuraciones' element={<ConfiguracionesPage />} />
        <Route path='reportes' element={<ReportesPage />} />
        <Route path="*" element={<Navigate to={`${rolesUser.includes(roles.administrador) ?
          '/coordinador/primerospasos' : '/coordinador/estudiantes'}`} replace />} />
      </Route>
    </Routes>
  );
}
