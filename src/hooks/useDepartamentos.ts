import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchDepartamentosByPais as fetchDepartamentosPorPaisAPI, fetchDepartamentosByPaisNombre as fetchDepartamentosPorPaisNombreAPI, fetchDepartamentoById as fetchDepartamentoByIdAPI, createDepartamento as createDepartamentoAPI, updateDepartamento as updateDepartamentoAPI, deleteDepartamento as deleteDepartamentoAPI } from '../api/departamentos.api';
import { Departamento } from '../interfaces';

type UseDepartamentosReturn = {
  departamentos: Departamento[];
  cargando: boolean;
  error: AxiosError | null;
  fetchDepartamentos: (paisId: string) => Promise<void>;
  fetchDepartamentosByPaisNombre: (paisNombre: string) => Promise<void>;
  fetchDepartamentoById: (id: string) => Promise<Departamento | null>;
  createDepartamento: (nuevoDepartamento: Omit<Departamento, 'id'>) => Promise<void>;
  updateDepartamento: (id: string, departamentoActualizado: Omit<Departamento, 'id'>) => Promise<void>;
  deleteDepartamento: (id: string) => Promise<void>;
};

const useDepartamentos = (): UseDepartamentosReturn => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchDepartamentos = useCallback(async (paisId: string) => {
    setCargando(true);
    try {
      const data = await fetchDepartamentosPorPaisAPI(paisId);
      setDepartamentos(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchDepartamentosByPaisNombre = useCallback(async (paisNombre: string) => {
    setCargando(true);
    try {
      const data = await fetchDepartamentosPorPaisNombreAPI(paisNombre);
      setDepartamentos(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchDepartamentoById = async (id: string): Promise<Departamento | null> => {
    setCargando(true);
    try {
      const data = await fetchDepartamentoByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const createDepartamento = async (nuevoDepartamento: Omit<Departamento, 'id'>) => {
    setCargando(true);
    try {
      const data = await createDepartamentoAPI(nuevoDepartamento);
      setDepartamentos((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const updateDepartamento = async (id: string, departamentoActualizado: Omit<Departamento, 'id'>) => {
    setCargando(true);
    try {
      const data = await updateDepartamentoAPI(id, departamentoActualizado);
      setDepartamentos((prev) =>
        prev.map((departamento) => (departamento.id === id ? data : departamento))
      );
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const deleteDepartamento = async (id: string) => {
    setCargando(true);
    try {
      await deleteDepartamentoAPI(id);
      setDepartamentos((prev) => prev.filter((departamento) => departamento.id !== id));
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  return { departamentos, cargando, error, fetchDepartamentos, fetchDepartamentosByPaisNombre, fetchDepartamentoById, createDepartamento, updateDepartamento, deleteDepartamento };
};

export default useDepartamentos;
