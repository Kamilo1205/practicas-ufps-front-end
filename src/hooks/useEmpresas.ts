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
    addTutorEmpresa as addTutorToEmpresaAPI
} from '../api/empresa.api';
import { Empresa, Tutor } from '../interfaces';

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
  addTutorToEmpresaActual: (tutor: Omit<Tutor, 'id'>) => Promise<void>;
  getTutoresDeEmpresaActual: () => Promise<void>;
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

  const addTutorToEmpresaActual = async (tutor: Omit<Tutor, 'id'>) => {
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
    addTutorToEmpresaActual
  };
};

export default useEmpresas;
