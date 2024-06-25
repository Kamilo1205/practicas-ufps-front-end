import { useEffect } from 'react';
import { useAuth } from '../../contexts';
import useEstudiantes from '../../hooks/useEstudiantes';
import { EstudiantePerfilComponent } from '../../components/usuarios/perfil/EstudiantePerfilComponent';

export const PerfilPage = () => {
  const { user } = useAuth();
  const { estudiante, fetchEstudiante } = useEstudiantes();

  useEffect(() => {
    fetchEstudiante();
  }, []);

  return (
    <div>
      { estudiante && <EstudiantePerfilComponent estudiante={estudiante} />}
     
    </div>
  )
}
