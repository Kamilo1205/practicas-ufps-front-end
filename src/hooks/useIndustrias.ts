import { useState, useEffect, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchIndustrias as fetchIndustriasAPI, fetchIndustriaById as fetchIndustriaByIdAPI, createIndustria as createIndustriaAPI, updateIndustria as updateIndustriaAPI, deleteIndustria as deleteIndustriaAPI } from '../api/industria.api';
import { Industria } from '../interfaces';

type UseIndustriasReturn = {
  industrias: Industria[];
  loading: boolean;
  error: AxiosError | null;
  fetchIndustrias: () => Promise<void>;
  fetchIndustriaById: (id: string) => Promise<Industria | null>;
  createIndustria: (newIndustria: Omit<Industria, 'id'>) => Promise<void>;
  updateIndustria: (id: string, updatedIndustria: Omit<Industria, 'id'>) => Promise<void>;
  deleteIndustria: (id: string) => Promise<void>;
};

const useIndustrias = (): UseIndustriasReturn => {
  const [industrias, setIndustrias] = useState<Industria[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchIndustrias = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchIndustriasAPI();
      setIndustrias(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchIndustriaById = async (id: string): Promise<Industria | null> => {
    setLoading(true);
    try {
      const data = await fetchIndustriaByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createIndustria = async (newIndustria: Omit<Industria, 'id'>) => {
    setLoading(true);
    try {
      const data = await createIndustriaAPI(newIndustria);
      setIndustrias((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const updateIndustria = async (id: string, updatedIndustria: Omit<Industria, 'id'>) => {
    setLoading(true);
    try {
      const data = await updateIndustriaAPI(id, updatedIndustria);
      setIndustrias((prev) =>
        prev.map((industria) => (industria.id === id ? data : industria))
      );
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const deleteIndustria = async (id: string) => {
    setLoading(true);
    try {
      await deleteIndustriaAPI(id);
      setIndustrias((prev) => prev.filter((industria) => industria.id !== id));
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustrias();
  }, [fetchIndustrias]);

  return { industrias, loading, error, fetchIndustrias, fetchIndustriaById, createIndustria, updateIndustria, deleteIndustria };
};

export default useIndustrias;
