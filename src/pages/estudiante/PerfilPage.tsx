import { useEffect } from 'react';

import useEstudiantes from '../../hooks/useEstudiantes';
import { EstudiantePerfilComponent } from '../../components/usuarios/perfil/EstudiantePerfilComponent';

export const PerfilPage = () => {

  const { estudiante, fetchEstudiante } = useEstudiantes();

  useEffect(() => {
    fetchEstudiante();
  }, []);

  return (
    <div>
      {estudiante && <EstudiantePerfilComponent estudiante={estudiante} />}

    </div>
  )
}
