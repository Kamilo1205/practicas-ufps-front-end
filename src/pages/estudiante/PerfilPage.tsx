import { useEffect } from 'react';

import useEstudiantes from '../../hooks/useEstudiantes';
import { EstudiantePerfilComponent } from '../../components/usuarios/perfil/EstudiantePerfilComponent';
import { useAuth } from '../../contexts';

export const PerfilPage = () => {
  const { user } = useAuth();
  console.log(user)
  const { estudiante, fetchEstudiante } = useEstudiantes();
  const cargarEstudiante = async () => {
    await fetchEstudiante();
  }
  useEffect(() => {
    if (!estudiante) cargarEstudiante();
  }, [estudiante]);

  return (
    <div>
      {estudiante && <EstudiantePerfilComponent estudiante={estudiante} />}

    </div>
  )
}
