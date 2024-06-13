import { Routes, Route } from 'react-router-dom';
import { AreasInteresPage } from '../pages/coordinador/AreasInteresPage';
// Importa otros componentes de configuración aquí

export const ConfiguracionRouter = () => {
  return (
    <Routes>
      <Route path="areas-interes" element={<AreasInteresPage />} />
    </Routes>
  );
};
