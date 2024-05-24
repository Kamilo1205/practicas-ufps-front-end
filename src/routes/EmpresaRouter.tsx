import { Navigate, Route, Routes } from 'react-router-dom';
import { RegistroPage } from '../pages/empresa';
import { useAuth } from '../contexts';
import { Layout } from '../layouts/Layout';
import { UsuariosPage } from '../pages/coordinador/UsuariosPage';

export const EmpresaRouter = () => {
  const { user } = useAuth();
  return (
    <Routes>
        {
          user?.estaRegistrado ?
            (
              <>
                <Route path='/' element={<Layout />}>
                  <Route path='/usuarios' element={<UsuariosPage />} />
                  <Route path="*" element={<Navigate to="/empresa" replace />} />
                </Route>
              </>
            )
            :
            (
              <>
                <Route index path='/' element={<RegistroPage />} />
                <Route path="*" element={<Navigate to="/empresa" replace />} />
              </>
            )   
        }
    </Routes>
  );
}