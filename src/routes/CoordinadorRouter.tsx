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
//import { roles } from '../interfaces/rol.interface';

export const CoordinadorRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/primerospasos' element={<IntroduccionPage />} />
        <Route path='configuraciones' element={<ConfiguracionesPage />} />
        <Route path='ARL' element={<ArlPage />} />
        <Route path='usuarios' element={<UsuariosPage />} />
        <Route path='empresas' element={<EmpresaPage />} />
        <Route path='estudiantes' element={<EstudiantesPage  />} />
        <Route path='documentos' element={<DocumentosPage />} /> 
        <Route path='calendario' element={<CalendarioPage />} />
        <Route path='configuracion/*' element={<ConfiguracionRouter />} />
        <Route path='practicas' element={<PracticasPage />} />
        <Route path='tutores' element={<GestionTutoresPage />} />
        <Route path='configuraciones' element={<ConfiguracionesPage />} />
        <Route path="*" element={<Navigate to="/coordinador/primerospasos" replace />} />
      </Route>
    </Routes>
  );
}
