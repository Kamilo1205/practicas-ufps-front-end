// hooks/useTipoAfiliacionEps.ts
import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchTipoAfiliacionEps as fetchTipoAfiliacionEpsAPI, fetchTipoAfiliacionEpsById as fetchTipoAfiliacionEpsByIdAPI, createTipoAfiliacionEps as createTipoAfiliacionEpsAPI, updateTipoAfiliacionEps as updateTipoAfiliacionEpsAPI, deleteTipoAfiliacionEps as deleteTipoAfiliacionEpsAPI } from '../api/tipoAfiliacionEps.api';
import { TipoAfiliacionEps } from '../interfaces/tipo-afiliacion-eps.interface';

type UseTipoAfiliacionEpsReturn = {
  tipoAfiliacionEps: TipoAfiliacionEps[];
  loading: boolean;
  error: AxiosError | null;
  fetchTipoAfiliacionEps: () => Promise<void>;
  fetchTipoAfiliacionEpsById: (id: string) => Promise<TipoAfiliacionEps | null>;
  createTipoAfiliacionEps: (newTipoAfiliacionEps: Omit<TipoAfiliacionEps, 'id'>) => Promise<void>;
  updateTipoAfiliacionEps: (id: string, updatedTipoAfiliacionEps: Omit<TipoAfiliacionEps, 'id'>) => Promise<void>;
  deleteTipoAfiliacionEps: (id: string) => Promise<void>;
};

const useTipoAfiliacionEps = (): UseTipoAfiliacionEpsReturn => {
  const [tipoAfiliacionEps, setTipoAfiliacionEps] = useState<TipoAfiliacionEps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchTipoAfiliacionEps = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTipoAfiliacionEpsAPI();
      setTipoAfiliacionEps(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchTipoAfiliacionEpsById = async (id: string): Promise<TipoAfiliacionEps | null> => {
    setLoading(true);
    try {
      const data = await fetchTipoAfiliacionEpsByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createTipoAfiliacionEps = async (newTipoAfiliacionEps: Omit<TipoAfiliacionEps, 'id'>) => {
    setLoading(true);
    try {
      const data = await createTipoAfiliacionEpsAPI(newTipoAfiliacionEps);
      setTipoAfiliacionEps((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const updateTipoAfiliacionEps = async (id: string, updatedTipoAfiliacionEps: Omit<TipoAfiliacionEps, 'id'>) => {
    setLoading(true);
    try {
      const data = await updateTipoAfiliacionEpsAPI(id, updatedTipoAfiliacionEps);
      setTipoAfiliacionEps((prev) =>
        prev.map((tipo) => (tipo.id === id ? data : tipo))
      );
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const deleteTipoAfiliacionEps = async (id: string) => {
    setLoading(true);
    try {
      await deleteTipoAfiliacionEpsAPI(id);
      setTipoAfiliacionEps((prev) => prev.filter((tipo) => tipo.id !== id));
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTipoAfiliacionEps();
  }, [fetchTipoAfiliacionEps]);

  return { tipoAfiliacionEps, loading, error, fetchTipoAfiliacionEps, fetchTipoAfiliacionEpsById, createTipoAfiliacionEps, updateTipoAfiliacionEps, deleteTipoAfiliacionEps };
};

export default useTipoAfiliacionEps;
