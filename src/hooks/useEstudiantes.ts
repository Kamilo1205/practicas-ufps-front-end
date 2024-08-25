import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { 
    fetchEstudiante as fetchEstudianteAPI, 
    fetchEstudiantes as fetchEstudiantesAPI, 
    createEstudiante as createEstudianteAPI, 
    updateEstudiante as updateEstudianteAPI, 
    deleteEstudiante as deleteEstudianteAPI,
    fetchEstudianteById as fetchEstudianteByIdAPI, 
    createEstudiantesPorCSV
} from '../api/estudiante.api';
import { Estudiante } from '../interfaces/estudiante.interface';
import Swal from 'sweetalert2';

type UseEstudiantesReturn = {
  estudiantes: Estudiante[];
  estudiante: Estudiante | null;
  cargando: boolean;
  error: AxiosError | null;
  fetchEstudiantes: (page?: number, limit?: number) => Promise<void>;
  fetchEstudiante: () => Promise<Estudiante | null>;
  fetchEstudianteById: (id: string) => Promise<Estudiante | null>;
  createEstudiante: (nuevoEstudiante: Omit<Estudiante, 'id'>,rediredUrl?:string) => Promise<void>;
  updateEstudiante: (id: string, estudianteActualizado: Omit<Estudiante, 'id'>) => Promise<void>;
  deleteEstudiante: (id: string) => Promise<void>;
  cargarEstudiantesCsvAGrupo: (file: File,grupo:string) => Promise<void>;
};

const useEstudiantes = (): UseEstudiantesReturn => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchEstudiantes = useCallback(async (page: number = 1, limit: number = 10) => {
    setCargando(true);
    try {
      const response = await fetchEstudiantesAPI(page, limit);
      setEstudiantes(response.data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchEstudiante = async (): Promise<Estudiante | null> => {
    setCargando(true);
    try {
      console.log('fetchEstudiante');
      const data = await fetchEstudianteAPI();
      console.log(data);
      setEstudiante(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const fetchEstudianteById = async (id: string): Promise<Estudiante | null> => {
    setCargando(true);
    try {
      const data = await fetchEstudianteByIdAPI(id);
      setEstudiante(data);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const createEstudiante = async (nuevoEstudiante: Omit<Estudiante, 'id'>,rediredUrl='') => {
    setCargando(true);
    try {
      const data = await createEstudianteAPI(nuevoEstudiante);
      setEstudiantes((prev) => [...prev, data]);
      setEstudiante(data);
      setError(null);
      Swal.fire({
        icon: 'success',
        title: 'Estudiante registrado',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => { 
        if(rediredUrl !== '') window.location.reload();
      })
    } catch (err) {
      setError(err as AxiosError);
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar el estudiante',
        text: 'Por favor, intenta de nuevo o contacta a soporte.',
      })
    } finally {
      setCargando(false);
    }
  };

  const updateEstudiante = async (id: string, estudianteActualizado: Omit<Estudiante, 'id'>) => {
    setCargando(true);
    try {
      const data = await updateEstudianteAPI(id, estudianteActualizado);
      setEstudiantes((prev) =>
        prev.map((estudiante) => (estudiante.id === id ? data : estudiante))
      );
      if (estudiante && estudiante.id === id) {
        setEstudiante(data);
      }
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const deleteEstudiante = async (id: string) => {
    setCargando(true);
    try {
      await deleteEstudianteAPI(id);
      setEstudiantes((prev) => prev.filter((estudiante) => estudiante.id !== id));
      if (estudiante && estudiante.id === id) {
        setEstudiante(null);
      }
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const cargarEstudiantesCsvAGrupo = async (file: File,grupoId:string) => { 
    setCargando(true);
    try {
      await createEstudiantesPorCSV(file,grupoId);
      fetchEstudiantes(1,10);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  
  }

  return {
    estudiantes, estudiante, cargando, error,
    fetchEstudiantes, fetchEstudiante, fetchEstudianteById, createEstudiante, updateEstudiante, deleteEstudiante,
    cargarEstudiantesCsvAGrupo
  };
};

export default useEstudiantes;
