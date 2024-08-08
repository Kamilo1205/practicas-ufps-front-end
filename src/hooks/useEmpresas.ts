import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { 
    fetchGetEmpresa as fetchGetEmpresaAPI, 
    fetchGetEmpresas as fetchGetEmpresasAPI, 
    fetchPostEmpresa as createEmpresaAPI, 
    updateEmpresa as updateEmpresaAPI, 
    deleteEmpresa as deleteEmpresaAPI,
    fetchGetEmpresaById as fetchGetEmpresaByIdAPI,
    fetchTutoresByEmpresaId as fetchTutoresByEmpresaIdAPI,
    addTutorToEmpresaById as addTutorToEmpresaByIdAPI,
    getTutoresEmpresa as getTutoresEmpresaAPI,
    addTutorEmpresa as addTutorToEmpresaAPI,
    getPracticantesDeEmpresaApi,
    asignarTutorEmpresaApi,
    deshabilitarTutorEmpresaApi,
    habilitarTutorEmpresaApi,
    registrarDependenciaApi
} from '../api/empresa.api';
import { Empresa, Tutor } from '../interfaces';
import Swal from 'sweetalert2';


interface DatosFormularioTutor {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccionTrabajo: string

}

type UseEmpresasReturn = {
  empresas: Empresa[];
  empresa: Empresa | null;
  tutores: Tutor[];
  cargando: boolean;
  error: AxiosError | null;
  fetchEmpresas: (page?: number, limit?: number) => Promise<void>;
  fetchEmpresa: () => Promise<Empresa | null>;
  fetchEmpresaById: (id: string) => Promise<Empresa | null>;
  createEmpresa: (nuevaEmpresa: Omit<Empresa, 'id'>) => Promise<void>;
  updateEmpresa: (id: string, empresaActualizada: Omit<Empresa, 'id'>) => Promise<void>;
  deleteEmpresa: (id: string) => Promise<void>;
  fetchTutoresByEmpresaId: (empresaId: string) => Promise<void>;
  addTutorToEmpresaById: (empresaId: string, tutor: Omit<Tutor, 'id'>) => Promise<void>;
  addTutorToEmpresaActual: (tutor: DatosFormularioTutor) => Promise<void>;
  getTutoresDeEmpresaActual: () => Promise<void>;
  getTodosLosTutores: () => Promise<Tutor[]>;
  getTutorById: ({ empresaId, tutorId }: { empresaId: string, tutorId: string }) => Promise<any>
  getPracticantesPorTutorId: (tutorId: string) => Promise<any>
  getPracticantesDeEmpresa: (idEmpresa: string) => Promise<void>
  asignarTutorAsignacion: (asignacionId: string, tutorId: string) => Promise<void>
  deshabilitarTutorEmpresa: (tutorId: string) => Promise<void>
  habilitarTutorEmpresa: (tutorId: string) => Promise<void>
  registrarDependencia: (data: any) => Promise<void>
};

const useEmpresas = (): UseEmpresasReturn => {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchEmpresas = useCallback(async (page: number = 1, limit: number = 10) => {
    setCargando(true);
    try {
      const response = await fetchGetEmpresasAPI(page, limit);
      setEmpresas(response.data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchEmpresa = async (): Promise<Empresa | null> => {
    setCargando(true);
    try {
      const data = await fetchGetEmpresaAPI();
      setEmpresa(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const fetchEmpresaById = async (id: string): Promise<Empresa | null> => {
    setCargando(true);
    try {
      const data = await fetchGetEmpresaByIdAPI(id);
      setEmpresa(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const createEmpresa = async (nuevaEmpresa: Omit<Empresa, 'id'>) => {
    setCargando(true);
    try {
      const data = await createEmpresaAPI(nuevaEmpresa);
      setEmpresas((prev) => [...prev, data]);
      setEmpresa(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const updateEmpresa = async (id: string, empresaActualizada: Omit<Empresa, 'id'>) => {
    setCargando(true);
    try {
      const data = await updateEmpresaAPI(id, empresaActualizada);
      setEmpresas((prev) =>
        prev.map((empresa) => (empresa.id === id ? data : empresa))
      );
      if (empresa && empresa.id === id) {
        setEmpresa(data);
      }
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const deleteEmpresa = async (id: string) => {
    setCargando(true);
    try {
      await deleteEmpresaAPI(id);
      setEmpresas((prev) => prev.filter((empresa) => empresa.id !== id));
      if (empresa && empresa.id === id) {
        setEmpresa(null);
      }
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const fetchTutoresByEmpresaId = async (empresaId: string) => {
    setCargando(true);
    try {
      const data = await fetchTutoresByEmpresaIdAPI(empresaId);
      setTutores(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const addTutorToEmpresaById = async (empresaId: string, tutor: Omit<Tutor, 'id'>) => {
    setCargando(true);
    try {
      const data = await addTutorToEmpresaByIdAPI(empresaId, tutor);
      setTutores((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const getTutoresDeEmpresaActual = async () => {
    setCargando(true);
    try {
      const data = await getTutoresEmpresaAPI();
      setTutores(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

 

  const addTutorToEmpresaActual = async (tutor: DatosFormularioTutor) => {
    setCargando(true);
    try {
      const data = await addTutorToEmpresaAPI(tutor);
      setTutores((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const getTodosLosTutores = async (): Promise<Tutor[]> => { 
    setCargando(true);
    try {
      const data = await getTodosLosTutores();
      setTutores(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return [];
    } finally {
      setCargando(false);
    }
  }

  const getTutorById = async ({empresaId, tutorId}:{empresaId:string,tutorId:string}) => {
    setCargando(true)
    try {
      //TODO: Esperando al backend para conectar la API de tutor.
      const data = {
        id: '',
        nombre: 'Juan',
        apellidos: 'Perez',
        telefono: '57322232323',
        direccionTrabajo: "calle 20 # 2-211"
      }
      setError(null)
      return data
      
    }
    catch (err ) {
      setError(err as AxiosError)
      return {}
    }
    finally {
      setCargando(false)
    }
  }

  const getPracticantesPorTutorId = (tutorId: string) => {
      setCargando(true)
      try {
        // TODO: Implement logic for getting practicantes by tutorId
        const data = Promise.resolve([
          {
            id: '1',
            nombre: 'Javier',
            correo: 'javier@correo.com',
            telefono: '573222222222',
            planTrabajo: '',
            primerInforme: '',
            segundoInforme: ''
          }
        ])
        setError(null)
        return data
      }
      catch (err) {
        // Handle error
        setError(err as AxiosError)
        return []
      }
      finally {
        setCargando(false)
      }
  }

  const getPracticantesDeEmpresa = async (idEmpresa:string) => { 
    setCargando(true);
    try {
      const data = await getPracticantesDeEmpresaApi(idEmpresa);
      setError(null);
      return data

      
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }

  const asignarTutorAsignacion = async (asignacionId: string, tutorId: string) => { 
    setCargando(true);
    try {
        await asignarTutorEmpresaApi(asignacionId, tutorId).then((data) => { 
          Swal.fire('Tutor asignado', 'El tutor ha sido asignado correctamente', 'success').then(() => { 
            setError(null);
            location.reload();
          })
      })
    } catch (err) { 
      setError(err as AxiosError);
    }
    finally {
      setCargando(false);
    }
  }

  const deshabilitarTutorEmpresa = async (tutorId: string) => { 
    setCargando(true);
    try {
      deshabilitarTutorEmpresaApi(tutorId).then((data) => {
        Swal.fire('Tutor deshabilitado', 'El tutor ha sido deshabilitado correctamente', 'success').then(() => {
          setError(null);
          location.reload();
        })
      }).catch((err) => { 
        Swal.fire('Error', 'No se ha podido deshabilitar el tutor', 'error') 
      })
    }
    catch (err) { 
      setError(err as AxiosError);
    }
    finally {
      setCargando(false);
    }
  }

  const habilitarTutorEmpresa = async (tutorId: string) => {
    setCargando(true);
    try {
      habilitarTutorEmpresaApi(tutorId).then((data) => {
        Swal.fire('Tutor habilitado', 'El tutor ha sido habilitado correctamente', 'success').then(() => {
          setError(null);
          location.reload();
        })
      }).catch((err) => { 
        Swal.fire('Error', 'No se ha podido habilitar el tutor', 'error')
      }) 
    }
    catch (err) {
      setError(err as AxiosError);
    }
    finally {
      setCargando(false);
    }
  }
  
  const registrarDependencia = async (data: any) => { 
    setCargando(true);
    try {
      Swal.fire({
        title: 'Cargando...',
        text: 'Por favor, espere.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      registrarDependenciaApi(data).then((data) => {
        Swal.close(); 
        Swal.fire('Dependencia registrada', 'La dependencia ha sido registrada correctamente', 'success').then(() => {
          setError(null);
          location.reload();
        })
      }).catch((err) => { 
        Swal.fire('Error', 'No se ha podido registrar la dependencia', 'error')
      })
    }
    catch (err) { 
      setError(err as AxiosError);
    }
    finally {
      setCargando(false);
    }
  }

  return { 
    empresas, 
    empresa, 
    tutores, 
    cargando, 
    error, 
    fetchEmpresas, 
    fetchEmpresa, 
    fetchEmpresaById, 
    createEmpresa, 
    updateEmpresa, 
    deleteEmpresa, 
    fetchTutoresByEmpresaId, 
    addTutorToEmpresaById,
    getTutoresDeEmpresaActual,
    addTutorToEmpresaActual,
    getTodosLosTutores,
    getTutorById,
    getPracticantesPorTutorId,
    getPracticantesDeEmpresa,
    asignarTutorAsignacion,
    deshabilitarTutorEmpresa,
    habilitarTutorEmpresa,
    registrarDependencia
  };
};

export default useEmpresas;
