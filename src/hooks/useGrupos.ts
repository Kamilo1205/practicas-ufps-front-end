import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { eliminarDocenteApi, getDocentesApi, habilitarDocenteApi, postDocenteApi } from "../api/docentes.api";
import { asignarDocenteApi, deleteGrupoPracticaApi, getGruposPracticasApi, postGruposPracticasApi, registrarEstudiantesGrupoApi } from "../api/gupos_practicas.api";

const fetchGruposAPI = async () => { 
  const response = await getGruposPracticasApi()
  return response
  
}

const fetchDocentes = async () => {
  return getDocentesApi()

 }


interface DocenteI{
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  fotoUrl?: string;
  fechaEliminacion?: Date;
}

const fetchNuevoDocente = async (docente:DocenteI) => {
  return postDocenteApi(docente)
}


export interface GrupoI { 
  id: string;
  nombre: string;
  docente?: DocenteI | null;
  fechaEliminacion?: Date;

}

export const useGrupos = () => { 
  const [grupos, setGrupos] = useState<GrupoI[]>([])
  const [error, setError] = useState<string | null>(null)
  const [docentes, setDocentes] = useState<DocenteI[]>([])
  
  useEffect(() => { 
   
      fetchGruposAPI()
        .then((resp) => {
          let grup = resp.filter((grupo: any) => !grupo.fechaEliminacion)
          grup = grup.map((grupo: any) => { 
            return {
              ...grupo,
              docente: grupo.tutor
            }  
          })
          console.log('grupo', grup)
          setGrupos(grup);
        })
        .catch((err) => setError(err));
    

    
      fetchDocentes()
        .then((resp) => {
          //console.log('docentes', resp)
          setDocentes(resp);
        })
        .catch((err) => setError(err));
    //console.log('useGrupos mounted')
    
  }, [])

  useEffect(() => { 
    //console.log('docentes', docentes)
  }, [grupos, docentes])

  const getDocentesDiponibles = () => { 
    return docentes.filter((docente) => !docente.fechaEliminacion )
  }
  const obtenerSiguienteNombreGrupo = (): string => {
    const totalGrupos = grupos.length;

    // Calcular la siguiente letra en base al número de grupos existentes
    const nuevaLetra = String.fromCharCode(65 + totalGrupos); // 65 es el código ASCII de 'A'

    return `Grupo ${nuevaLetra}`;
  };

  const crearNuevoGrupo = () => {
  
    const nombreNuevoGrupo = obtenerSiguienteNombreGrupo()
    console.log('nombre nuevo grupo', nombreNuevoGrupo)
    if (grupos.find((grupo) => grupo.nombre === nombreNuevoGrupo)) {
      setError('Ya existe un grupo con ese nombre');
      Swal.fire({
        title: 'Error',
        text: `Ya existe un grupo con ese nombre. ${nombreNuevoGrupo}`,
        icon: 'error'
      })
      return;
     }
    const fetching = postGruposPracticasApi({ nombre: nombreNuevoGrupo})
    fetching.then((resp) => {
      setGrupos([...grupos, resp]);
      Swal.fire(
        'Creado!',
        'El grupo ha sido creado.',
        'success'
      )
    }).catch((err) => setError(err));
  };


  const eliminarGrupo = () => {
    if (grupos.length === 0) {
      setError('No hay grupos para eliminar');
      return;
    }

    const fetching = deleteGrupoPracticaApi( grupos[grupos.length - 1].id );

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
        text: `El docente ${docente.nombres} ha sido creado.`,
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
    //const fetching = Promise.resolve({ id: docenteId });
    const fetching = eliminarDocenteApi(docenteId)
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

  const habilitarDocente = (docenteId: string) => { 
    const response = habilitarDocenteApi(docenteId)
    response.then(() => { 
      const nuevosDocentes = docentes.map((doc) => {
        if (doc.id === docenteId) {
          delete doc.fechaEliminacion
        }
        return doc
      })
      Swal.fire({
        title: 'Docente habilitado',
        text: `El docente ha sido habilitado.`,
        icon: 'success'
      }).then(() => {
        setDocentes(nuevosDocentes)
      })
    }, (err) => {
      Swal.fire({
        title: 'Ha ocurrido un error inesperado!',
        text: 'Refresque la página e inténtelo nuevamente.',
        icon: 'error'
      })
      setError(err)
    })
  }

  const asignarDocenteGrupo = (grupoId: string, docenteId: string | null) => { 
    const fetching = asignarDocenteApi(grupoId, docenteId)
    fetching.then(() => {
      const nuevosGrupos = grupos.map((grupo) => {
        if (grupo.id === grupoId) {
          grupo.docente = docentes.find((doc) => doc.id === docenteId)
        }
        return grupo
      })
      setGrupos(nuevosGrupos)
      Swal.fire({
        title: 'Docente asignado',
        text: `El docente ha sido asignado al grupo.`,
        icon: 'success',
        showConfirmButton:true
      })
    }).catch((err) => {
      setError(err)
      Swal.fire({
        title: 'Error',
        text: 'No se ha podido asignar el docente.',
        icon: 'error',
        showConfirmButton:true
      })
    })
  }

  const asignarEstudinatesAGrupo = (grupoId: string, archivo: File) => { 
    
    registrarEstudiantesGrupoApi(grupoId, archivo).then(() => {
      
      Swal.fire({
        title: 'Estudiantes registrados',
        text: 'Los estudiantes han sido registrados en el grupo.',
        icon: 'success',
        showConfirmButton: true
      })
    }).catch((err) => { 
      Swal.fire({
        title: 'Error',
        text: 'No se han podido registrar los estudiantes.',
        icon: 'error',
        showConfirmButton: true
      })
      setError(err)
      location.reload()
    })
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
    eliminarDocente,
    habilitarDocente,
    asignarDocenteGrupo
  };
}