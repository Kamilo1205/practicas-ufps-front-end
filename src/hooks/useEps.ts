import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchEps as fetchEpsAPI, fetchEpsById as fetchEpsByIdAPI, createEps as createEpsAPI, updateEps as updateEpsAPI, deleteEps as deleteEpsAPI } from '../api/eps.api';
import { Eps } from '../interfaces/eps.interface';

type UseEpsReturn = {
  eps: Eps[];
  loading: boolean;
  error: AxiosError | null;
  fetchEps: () => Promise<void>;
  fetchEpsById: (id: string) => Promise<Eps | null>;
  createEps: (newEps: Omit<Eps, 'id'>) => Promise<void>;
  updateEps: (id: string, updatedEps: Omit<Eps, 'id'>) => Promise<void>;
  deleteEps: (id: string) => Promise<void>;
};

const useEps = (): UseEpsReturn => {
  const [eps, setEps] = useState<Eps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchEps = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchEpsAPI();
      setEps(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEpsById = async (id: string): Promise<Eps | null> => {
    setLoading(true);
    try {
      const data = await fetchEpsByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createEps = async (newEps: Omit<Eps, 'id'>) => {
    setLoading(true);
    try {
      const data = await createEpsAPI(newEps);
      setEps((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const updateEps = async (id: string, updatedEps: Omit<Eps, 'id'>) => {
    setLoading(true);
    try {
      const data = await updateEpsAPI(id, updatedEps);
      setEps((prev) =>
        prev.map((epsItem) => (epsItem.id === id ? data : epsItem))
      );
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const deleteEps = async (id: string) => {
    setLoading(true);
    try {
      await deleteEpsAPI(id);
      setEps((prev) => prev.filter((epsItem) => epsItem.id !== id));
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEps();
  }, [fetchEps]);

  return { eps, loading, error, fetchEps, fetchEpsById, createEps, updateEps, deleteEps };
};

export default useEps;
