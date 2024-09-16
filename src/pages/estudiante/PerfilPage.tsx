import { useEffect, useState } from 'react';
import { EstudiantePerfilComponent } from '../../components/usuarios/perfil/EstudiantePerfilComponent';
import LoadingSpinner from '../../components/ui/Pagination/LoadingSpiner';

export const PerfilPage = ({ estudiante, rol }: any) => {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (estudiante) setLoading(false);
  }, [estudiante]);

  return (
    <div>
      {loading && <div className='w-full h-dvh flex justify-center align-middle'>
        <LoadingSpinner />
      </div>}
      {estudiante && <EstudiantePerfilComponent estudiante={estudiante} rol={rol} />}

    </div>
  )
}
