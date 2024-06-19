import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts';
import { AuthRouter } from './AuthRouter';
import { EmpresaRouter } from './EmpresaRouter';
import { CoordinadorRouter } from './CoordinadorRouter';
import { EstudianteRouter } from './EstudianteRouter';
import { TutorRouter } from './TutorRouter';

export const AppRouter = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log('WTF 1',user, isAuthenticated);
  if (!isAuthenticated) {
    console.log('WTF 2', user, isAuthenticated);

    return <Routes>
      <Route path='auth/*' element={<AuthRouter />} />
      <Route path='*' element={<Navigate to="/auth" replace={true} />} /> 
    </Routes>;
  }

  return (
    <Routes>
      
      { 
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'coordinador' ) && (
          <>
            <Route path='coordinador/*' element={<CoordinadorRouter />} />
            <Route path='*' element={<Navigate to="/coordinador" />} /> 
          </>
        )
      }
      { 
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'empresa' ) && (
          <>
            <Route path='empresa/*' element={<EmpresaRouter />} />
            <Route path='*' element={<Navigate to="/empresa" />} /> 
          </>
        )
      }
      { 
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'tutor' ) && (
          <>
            <Route path='tutor/*' element={<TutorRouter />} />
            <Route path='*' element={<Navigate to="/tutor" />} /> 
          </>
        )
      }
      { 
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'estudiante' ) && (
          <>
            <Route path='/estudiante/*' element={<EstudianteRouter />} />
            <Route path='*' element={<Navigate to="/estudiante" />} /> 
          </>
        )
      }
      { 
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'director-programa' ) && (
          <>
            <Route path='/director-programa/*' element={<EmpresaRouter />} />
            <Route path='*' element={<Navigate to="/director-programa" />} /> 
          </>
        )
      }   
    </Routes>
  );
}
