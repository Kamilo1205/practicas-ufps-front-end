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
      {JSON.stringify(estudiante, null, 2)}
    </div>
  )
}
