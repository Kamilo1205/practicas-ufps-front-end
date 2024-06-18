import { Navigate, Route, Routes } from "react-router-dom";
import { RegistroPage } from "../pages/estudiante";
import { useAuth } from "../contexts";
import { Layout } from "../layouts/Layout";
import { UsuariosPage } from "../pages/coordinador/UsuariosPage";
import { RegistroLayout } from "../layouts/RegistroLayout";
import { PerfilPage } from "../pages/estudiante/PerfilPage";
import PlanDeTrabajoPage from "../pages/estudiante/PlanDeTrabajoPage";

export const EstudianteRouter = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {user?.estaRegistrado ? (
        <>
          <Route path="/" element={<Layout />}>
            <Route index path="" element={<PerfilPage />} />
            <Route path="usuarios" element={<UsuariosPage />} />
            <Route
              path="plantrabajo"element={<PlanDeTrabajoPage />}
            />
            <Route path="*" element={<Navigate to="/estudiante" replace />} />
          </Route>
        </>
      ) : (
        <Route element={<RegistroLayout />}>
          <Route index path="/" element={<RegistroPage />} />
          <Route path="*" element={<Navigate to="/estudiante" replace />} />
        </Route>
      )}
    </Routes>
  );
};
