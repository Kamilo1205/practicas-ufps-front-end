import { Navigate, Route, Routes } from "react-router-dom";
import { RegistroPage } from "../pages/estudiante";
import { useAuth } from "../contexts";
import { Layout } from "../layouts/Layout";
import { UsuariosPage } from "../pages/coordinador/UsuariosPage";
import { RegistroLayout } from "../layouts/RegistroLayout";
import { PerfilPage } from "../pages/estudiante/PerfilPage";
import PlanDeTrabajoVista from "./../components/PlanDeTrabajo/Coordinador-Empresa/PlanDeTrabajoVista";
import InformeParicialPage from "./../pages/estudiante/InformeParicialPage";

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
              path="plantrabajo"
              element={
                <PlanDeTrabajoVista rol="ESTUDIANTE" initialOpen={false} />
              }
            />
            <Route
              path="informeparcial"
              element={
                <InformeParicialPage rol={true} /> //TRUE=== ESTUDIANTE SINO POS FALSE
              }
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
