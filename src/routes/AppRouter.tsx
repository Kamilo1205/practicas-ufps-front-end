import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts';
import { AuthRouter } from './AuthRouter';
import { EmpresaRouter } from './EmpresaRouter';
import { CoordinadorRouter } from './CoordinadorRouter';
import { EstudianteRouter } from './EstudianteRouter';

export const AppRouter = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      { 
        !isAuthenticated && (
          <>
            <Route path='/auth/*' element={<AuthRouter />} />
            <Route path='*' element={<Navigate to="/auth" replace={true} />} />  
          </>
        )
      } 
      { 
        isAuthenticated && user && user.roles.some(rol => rol.nombre == 'coordinador' ) && (
          <>
            <Route path='/coordinador/*' element={<CoordinadorRouter />} />
            <Route path='*' element={<Navigate to="/coordinador" />} /> 
          </>
        )
      }
      { 
        isAuthenticated && user && user.roles.some(rol => rol.nombre == 'empresa' ) && (
          <>
            <Route path='/empresa/*' element={<EmpresaRouter />} />
            <Route path='*' element={<Navigate to="/empresa" />} /> 
          </>
        )
      }
      { 
        isAuthenticated && user && user.roles.some(rol => rol.nombre == 'tutor' ) && (
          <>
            <Route path='/tutor/*' element={<CoordinadorRouter />} />
            <Route path='*' element={<Navigate to="/tutor" />} /> 
          </>
        )
      }
      { 
        isAuthenticated && user && user.roles.some(rol => rol.nombre == 'estudiante' ) && (
          <>
            <Route path='/estudiante/*' element={<EstudianteRouter />} />
            <Route path='*' element={<Navigate to="/estudiante" />} /> 
          </>
        )
      }
      { 
        isAuthenticated && user && user.roles.some(rol => rol.nombre == 'director-programa' ) && (
          <>
            <Route path='/director-programa/*' element={<EmpresaRouter />} />
            <Route path='*' element={<Navigate to="/director-programa" />} /> 
          </>
        )
      }   
    </Routes>
  );
}
