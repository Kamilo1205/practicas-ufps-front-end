import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts";
import { Layout } from "../layouts/Layout";
import { RegistroLayout } from "../layouts/RegistroLayout";
import { RegistroPage } from "../pages/auth";
import { DirectorSolicitudesPage } from "../pages/director/SolicitudesPage";


export const DirectorRouter = () => { 
  const { user } = useAuth();
  return (
    <Routes>
      {
        user?.estaRegistrado ?
          (
            <>
              <Route path='/' element={<Layout />}>
                <Route path='solicitudes' element={<DirectorSolicitudesPage />} />
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