import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../layouts/Layout';
import { CoordinadorScreen } from '../pages/coordinador/CoordinadorScreen';
import { UsuariosPage } from '../pages/coordinador/UsuariosPage';
import { EmpresaPage } from '../pages/coordinador/EmpresasPages';

export const CoordinadorRouter = () => {
  return (
    <Routes>
        <Route element={<Layout />}>
          <Route index path='/' element={<CoordinadorScreen />} />
          <Route index path='/usuarios' element={<UsuariosPage />} />
          <Route index path='/empresas' element={<EmpresaPage />} />
          <Route path="*" element={<Navigate to="/coordinador" replace />} />
        </Route>
    </Routes>
  );
}