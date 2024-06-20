import { useEffect, useState } from "react";

const fetchGruposAPI = async () => { 
  return Promise.resolve([
    {
      id: '1',
      nombre: 'Grupo A',
      docente: {
        id: '1',
        nombre: 'Docente A',
      },
    },
    {
      id: '2',
      nombre: 'Grupo B',
      docente: {
        id: '2',
        nombre: 'Docente B',
      
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
    },
    {
      id: '2',
      nombre: 'Docente B',
    },
    {
      id: '3',
      nombre: 'Docente C',
    },
    {
      id: '4',
      nombre: 'Docente D',
    }
  ]);
 }

interface DocenteI{
  id: string;
  nombre: string;
}

interface GrupoI { 
  id: string;
  nombre: string;
  docente: DocenteI | null;

}

export const useGrupos = () => { 
  const [grupos, setGrupos] = useState<GrupoI[]>([])
  const [error, setError] = useState(null)
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
    
  }, [])

  const getDocentesDiponibles = () => { 
    return docentes.filter((docente) => !grupos.find((grupo) => grupo.docente && grupo.docente.nombre === docente.nombre))
  }

  return {
    grupos,
    docentes,
    error,
    getDocentesDiponibles
  };
}