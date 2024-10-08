import { Navigate, Route, Routes } from 'react-router-dom';
import { RegistroPage } from '../pages/empresa';
import { useAuth } from '../contexts';
import { Layout } from '../layouts/Layout';

import { RegistroLayout } from '../layouts/RegistroLayout';
import { SolicitudesPracticantes } from '../pages/empresa/SolicitudesPracticantes';
import { TutoresPage } from '../pages/empresa/TutoresPage';
import { PracticantesPage } from '../pages/empresa/PracticantesPage';

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

                <Route path='practicantes' element={<PracticantesPage />} />
                <Route path="*" element={<Navigate to="/practicantes" replace />} />
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
