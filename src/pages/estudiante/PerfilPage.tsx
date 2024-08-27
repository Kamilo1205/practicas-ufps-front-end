import { useEffect } from 'react';

import useEstudiantes from '../../hooks/useEstudiantes';
import { EstudiantePerfilComponent } from '../../components/usuarios/perfil/EstudiantePerfilComponent';
import { useAuth } from '../../contexts';

export const PerfilPage = () => {

  const { estudiante, fetchEstudiante } = useEstudiantes();
  const cargarEstudiante = async () => {
    console.log('se dispara')
    await fetchEstudiante();
  }
  useEffect(() => {
    if (!estudiante) cargarEstudiante();
  }, []);

  return (
    <div>
      {estudiante && <EstudiantePerfilComponent estudiante={estudiante} />}

    </div>
  )
}
