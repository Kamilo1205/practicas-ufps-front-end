import { Navigate, Route, Routes } from 'react-router-dom';
import { RegistroPage } from '../pages/empresa';
import { useAuth } from '../contexts';
import { Layout } from '../layouts/Layout';
import { UsuariosPage } from '../pages/coordinador/UsuariosPage';
import { RegistroLayout } from '../layouts/RegistroLayout';
import { SolicitudesPracticantes } from '../pages/empresa/SolicitudesPracticantes';
import { TutoresPage } from '../pages/empresa/TutoresPage';

export const EmpresaRouter = () => {
  const { user } = useAuth();
  return (
    <Routes>
        {
          user?.estaRegistrado ?
            (
              <>
              <Route path='/' element={<Layout />}>
                <Route path='solicitudes' element={<SolicitudesPracticantes />} />
                <Route path='tutores' element={<TutoresPage />} />

                  <Route path='practicantes' element={<UsuariosPage />} />
                  <Route path="*" element={<Navigate to="/empresa" replace />} />
                </Route>
              </>
            )
            :
            (
              <Route element={<RegistroLayout />}>
                <Route index path='/' element={<RegistroPage />} />
                <Route path="*" element={<Navigate to="/empresa" replace />} />
              </Route>
            )   
        }
    </Routes>
  );
}
