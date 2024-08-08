import { Navigate, Route, Routes } from "react-router-dom";
import { RegistroPage } from "../pages/estudiante";
import { useAuth } from "../contexts";
import { Layout } from "../layouts/Layout";
import { UsuariosPage } from "../pages/coordinador/UsuariosPage";
import { RegistroLayout } from "../layouts/RegistroLayout";
import { PerfilPage } from "../pages/estudiante/PerfilPage";
import PlanDeTrabajoVista from "./../components/PlanDeTrabajo/Coordinador-Empresa/PlanDeTrabajoVista";
import InformeParcialVista from "../components/VistasCoorDTutor/InformeParcialVista";
import InformeFinalVista from "../components/VistasCoorDTutor/InformeFinalVista";
import EvaluacionEstudianteVista from "../components/VistasCoorDTutor/EvaluacionPracticaVista";
import { useEffect } from "react";
import useEstudiantes from "../hooks/useEstudiantes";

export const EstudianteRouter = () => {
  const { user } = useAuth();
  const { estudiante, fetchEstudiante } = useEstudiantes();
  useEffect(() => {
    if (!estudiante) fetchEstudiante();
  }, [estudiante]);

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
                <PlanDeTrabajoVista
                  rol="estudiante"
                  initialOpen={false}
                  estudiante={estudiante}
                  isTutor={false}
                />
              }
            />
            <Route
              path="informeparcial"
              element={
                <InformeParcialVista
                  rol={"estudiante"}
                  initialOpen={false}
                  estudiante={estudiante}
                /> //TRUE=== ESTUDIANTE SINO POS FALSE
              }
            />
            <Route
              path="informefinal"
              element={
                <InformeFinalVista
                  rol={"estudiante"}
                  initialOpen={false}
                  estudiante={estudiante}
                /> //TRUE=== ESTUDIANTE SINO POS FALSE
              }
            />
            <Route
              path="evaluacionestudiante"
              element={
                <EvaluacionEstudianteVista
                  rol={"estudiante"}
                  initialOpen={false}
                  estudiante={estudiante}
                />
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
