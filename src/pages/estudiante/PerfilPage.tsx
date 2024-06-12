import { useEffect } from 'react';
import { useAuth } from '../../contexts';
import useEstudiantes from '../../hooks/useEstudiantes';

export const PerfilPage = () => {
  const { user } = useAuth();
  const { estudiante, fetchEstudiante } = useEstudiantes();

  useEffect(() => {
    fetchEstudiante();
  }, []);

  return (
    <div>
        {JSON.stringify(user, null, 2)}
        <hr></hr>
        {JSON.stringify(estudiante, null, 2)}
    </div>
  )
}
