import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts";
import { Layout } from "../layouts/Layout";
import { RegistroLayout } from "../layouts/RegistroLayout";
import { RegistroPage } from "../pages/auth";
//import { EmpresaPage } from "../pages/coordinador/EmpresasPage";
import { EstudiantesPage } from "../pages/coordinador/EstudiantesPage";
import { PracticasPage } from "../pages/coordinador/PracticasPage";
import { DirectorEmpresasPage } from "../pages/director/EmpresasPage";


export const DirectorRouter = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {
        user?.estaRegistrado ?
          (
            <>
              <Route path='/' element={<Layout />}>
                <Route path='empresas' element={<DirectorEmpresasPage />} />
                <Route path='estudiantes' element={<EstudiantesPage />} />

                <Route path='practicas' element={<PracticasPage />} />
                <Route path="*" element={<Navigate to="/director/empresas" replace />} />
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