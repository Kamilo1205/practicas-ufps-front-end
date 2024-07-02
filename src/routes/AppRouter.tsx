import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts';
import { AuthRouter } from './AuthRouter';
import { EmpresaRouter } from './EmpresaRouter';
import { CoordinadorRouter } from './CoordinadorRouter';
import { EstudianteRouter } from './EstudianteRouter';
import { TutorRouter } from './TutorRouter';
import { DirectorRouter } from './DirectorRouter';

export const AppRouter = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  //console.log(user?.roles.map(rol => rol.nombre))

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div
        className="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-red-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  }

  if (!isAuthenticated) {


    return <Routes>
      <Route path='auth/*' element={<AuthRouter />} />
      <Route path='*' element={<Navigate to="/auth" replace={true} />} />
    </Routes>;
  }

  return (
    <Routes>

      {
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'coordinador') && (
          <>
            <Route path='coordinador/*' element={<CoordinadorRouter />} />
            <Route path='*' element={<Navigate to="/coordinador" />} />
          </>
        )
      }
      {
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'empresa') && (
          <>
            <Route path='empresa/*' element={<EmpresaRouter />} />
            <Route path='*' element={<Navigate to="/empresa" />} />
          </>
        )
      }
      {
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'tutor') && (
          <>
            <Route path='tutor/*' element={<TutorRouter />} />
            <Route path='*' element={<Navigate to="/tutor" />} />
          </>
        )
      }
      {
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'estudiante') && (
          <>
            <Route path='/estudiante/*' element={<EstudianteRouter />} />
            <Route path='*' element={<Navigate to="/estudiante" />} />
          </>
        )
      }
      {
        isAuthenticated && user && user.roles?.some(rol => rol.nombre == 'director-programa') && (
          <>
            <Route path='/director/*' element={<DirectorRouter />} />
            <Route path='*' element={<Navigate to="/director/empresas" />} />
          </>
        )
      }
    </Routes>
  );
}
