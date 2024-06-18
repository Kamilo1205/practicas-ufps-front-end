import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../layouts/Layout';

import { PerfilPage } from '../pages/tutores/PerfilPage';
import { PracticantesPage } from '../pages/tutores/PracticantesPage';

export const TutorRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='perfil' element={<PerfilPage />} />
        <Route path='practicantes' element={<PracticantesPage />} />

        <Route path="*" element={<Navigate to="/tutor/perfil" replace />} />
      </Route>
    </Routes>
  );
}
