import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchPaises as fetchPaisesAPI, fetchPaisById as fetchPaisByIdAPI, createPais as createPaisAPI, updatePais as updatePaisAPI, deletePais as deletePaisAPI } from '../api/paises.api';
import { Pais } from '../interfaces';

type UsePaisesReturn = {
  paises: Pais[];
  cargando: boolean;
  error: AxiosError | null;
  fetchPaises: () => Promise<void>;
  fetchPaisById: (id: string) => Promise<Pais | null>;
  createPais: (nuevoPais: Omit<Pais, 'id'>) => Promise<void>;
  updatePais: (id: string, paisActualizado: Omit<Pais, 'id'>) => Promise<void>;
  deletePais: (id: string) => Promise<void>;
};

const usePaises = (): UsePaisesReturn => {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchPaises = useCallback(async () => {
    setCargando(true);
    try {
      const data = await fetchPaisesAPI();
      setPaises(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchPaisById = async (id: string): Promise<Pais | null> => {
    setCargando(true);
    try {
      const data = await fetchPaisByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const createPais = async (nuevoPais: Omit<Pais, 'id'>) => {
    setCargando(true);
    try {
      const data = await createPaisAPI(nuevoPais);
      setPaises((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const updatePais = async (id: string, paisActualizado: Omit<Pais, 'id'>) => {
    setCargando(true);
    try {
      const data = await updatePaisAPI(id, paisActualizado);
      setPaises((prev) =>
        prev.map((pais) => (pais.id === id ? data : pais))
      );
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const deletePais = async (id: string) => {
    setCargando(true);
    try {
      await deletePaisAPI(id);
      setPaises((prev) => prev.filter((pais) => pais.id !== id));
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchPaises();
  }, [fetchPaises]);

  return { paises, cargando, error, fetchPaises, fetchPaisById, createPais, updatePais, deletePais };
};

export default usePaises;
