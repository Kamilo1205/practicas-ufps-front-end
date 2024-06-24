import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
  fotoUrl?: string;
}

const fetchNuevoDocente = async (docente:DocenteI) => {
  return Promise.resolve({
    id: '5',
    nombre: docente.nombre,
    correo: docente.correo
  })
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
   
      fetchGruposAPI()
        .then((resp) => {
          setGrupos(resp);
        })
        .catch((err) => setError(err));
    

    
      fetchDocentes()
        .then((resp) => {
          setDocentes(resp);
        })
        .catch((err) => setError(err));
    console.log('useGrupos mounted')
    
  }, [])

  useEffect(() => { 
    console.log('docentes', docentes)
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

  const crearNuevoDocente = (docente:DocenteI) => { 
    const fetching = fetchNuevoDocente(docente)
    fetching.then((resp) => {
      
      Swal.fire({
        title: 'Docente creado',
        text: `El docente ${docente.nombre} ha sido creado.`,
        icon: 'success'
      }).then(() => {
        setDocentes([...docentes, resp])
      })
    }).catch((err) => {
      setError(err)
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido crear el docente.',
        icon: 'error'
      })
    })
  }

  const eliminarDocente = (docenteId: string) => { 
    const fetching = Promise.resolve({ id: docenteId });
    fetching.then(() => {
      const nuevosDocentes = docentes.filter((doc) => doc.id !== docenteId)
      Swal.fire({
        title: 'Docente eliminado',
        text: `El docente ha sido eliminado.`,
        icon: 'success'
      }).then(() => {
        setDocentes(nuevosDocentes);
      })
    }).catch((err) => {
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido eliminar el docente.',
        footer: err,
        icon: 'error'
      })
      setError(err)
    });
  
  }


  return {
    grupos,
    docentes,
    error,
    getDocentesDiponibles,
    crearNuevoGrupo,
    eliminarGrupo,
    obtenerSiguienteNombreGrupo,
    crearNuevoDocente,
    eliminarDocente
  };
}