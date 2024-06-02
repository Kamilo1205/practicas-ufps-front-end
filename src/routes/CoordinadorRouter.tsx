import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { CoordinadorScreen } from '../pages/coordinador/CoordinadorScreen';
import { UsuariosPage } from '../pages/coordinador/UsuariosPage';
import { EmpresaPage } from '../pages/coordinador/EmpresasPage';
import { EstudiantesPage } from '../pages/coordinador/EstudiantesPage';
import { DocumentosPage } from '../pages/coordinador/DocumentosPage';

export const CoordinadorRouter = () => {
  return (
    <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<CoordinadorScreen />} />
          <Route path='usuarios' element={<UsuariosPage />} />
          <Route path='empresas' element={<EmpresaPage />} />
          <Route path='estudiantes' element={<EstudiantesPage />} />
          <Route path='documentos' element={<DocumentosPage />} /> 
          <Route path="*" element={<Navigate to="/coordinador" replace />} />
        </Route>
    </Routes>
  );
}
