import { useEffect, useState } from 'react';

import useEstudiantes from '../../hooks/useEstudiantes';
import { EstudiantePerfilComponent } from '../../components/usuarios/perfil/EstudiantePerfilComponent';
import { useAuth } from '../../contexts';
import { set } from 'zod';
import LoadingSpinner from '../../components/ui/Pagination/LoadingSpiner';

export const PerfilPage = () => {

  const [loading, setLoading] = useState(true)
  const { estudiante, fetchEstudiante } = useEstudiantes();
  const cargarEstudiante = async () => {
    console.log('se dispara')
    await fetchEstudiante();
    setLoading(false)
  }
  useEffect(() => {
    if (!estudiante) cargarEstudiante();
  }, []);

  return (
    <div>
      {loading && <div className='w-full h-dvh flex justify-center align-middle'>
        <LoadingSpinner />
      </div>}
      {estudiante && <EstudiantePerfilComponent estudiante={estudiante} />}

    </div>
  )
}
