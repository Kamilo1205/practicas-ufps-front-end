import { useEffect, useState } from "react";

const fetchGruposAPI = async () => { 
  return Promise.resolve([
    {
      id: '1',
      nombre: 'Grupo A',
      docente: {
        id: '1',
        nombre: 'Docente A',
        correo: 'docenteA@correo.com'

      },
    },
    {
      id: '2',
      nombre: 'Grupo B',
      docente: {
        id: '2',
        nombre: 'Docente B',
        correo: 'docenteB@correo.com'

      
      },
    
    },
    {
      id: '3',
      nombre: 'Grupo C',
      docente: null,
    }
  ]);
}

const fetchDocentes = async () => {
  return Promise.resolve([
    {
      id: '1',
      nombre: 'Docente A',
      correo: 'docenteA@correo.com'
    },
    {
      id: '2',
      nombre: 'Docente B',
      correo: 'docenteB@correo.com'
    },
    {
      id: '3',
      nombre: 'Docente C',
      correo: 'docenteC@correo.com'
    },
    {
      id: '4',
      nombre: 'Docente D',
      correo: 'docenteD@correo.com'
    }
  ]);
 }

interface DocenteI{
  id: string;
  nombre: string;
  correo: string;
}

interface GrupoI { 
  id: string;
  nombre: string;
  docente: DocenteI | null;

}

export const useGrupos = () => { 
  const [grupos, setGrupos] = useState<GrupoI[]>([])
  const [error, setError] = useState<string | null>(null)
  const [docentes, setDocentes] = useState<DocenteI[]>([])

  useEffect(() => { 
    grupos.length === 0 &&
      fetchGruposAPI().then(
        (resp) => {
          setGrupos(resp)
          
        }
      ).catch((err) => setError(err))
    
    docentes.length === 0 &&
      fetchDocentes().then(
        (resp) => {
          setDocentes(resp)
        }
      ).catch((err) => setError(err))
    
  }, [grupos, docentes])

  const getDocentesDiponibles = () => { 
    return docentes.filter((docente) => !grupos.find((grupo) => grupo.docente && grupo.docente.nombre === docente.nombre))
  }
  const obtenerSiguienteNombreGrupo = (): string => {
    if (grupos.length === 0) {
      return 'Grupo A';
    }

    const ultimoGrupo = grupos[grupos.length - 1];
    const ultimaLetra = ultimoGrupo.nombre.charAt(ultimoGrupo.nombre.length - 1);
    const nuevaLetra = String.fromCharCode(ultimaLetra.charCodeAt(0) + 1);

    return `Grupo ${nuevaLetra}`;
  };

  const crearNuevoGrupo = () => {
    const fetching = Promise.resolve({
      id: String(grupos.length + 1),
      nombre: obtenerSiguienteNombreGrupo(),
      docente: null,
    });

    fetching.then((resp) => {
      setGrupos([...grupos, resp]);
    }).catch((err) => setError(err));
  };


  const eliminarGrupo = () => {
    if (grupos.length === 0) {
      setError('No hay grupos para eliminar');
      return;
    }

    const fetching = Promise.resolve({ id: grupos[grupos.length - 1].id });

    fetching.then(() => {
      const nuevosGrupos = grupos.slice(0, -1);
      setGrupos(nuevosGrupos);
    }).catch((err) => setError(err));
  };

  return {
    grupos,
    docentes,
    error,
    getDocentesDiponibles,
    crearNuevoGrupo,
    eliminarGrupo,
    obtenerSiguienteNombreGrupo
  };
}