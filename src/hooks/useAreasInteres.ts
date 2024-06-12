import { useState, useCallback, useEffect } from 'react';
import { AxiosError } from 'axios';
import { fetchAreasDeInteres as fetchAreasDeInteresAPI, fetchSubareasByArea as fetchSubareasPorAreaAPI, fetchAreaDeInteresById as fetchAreaDeInteresByIdAPI, createAreaDeInteres as createAreaDeInteresAPI, updateAreaDeInteres as updateAreaDeInteresAPI, deleteAreaDeInteres as deleteAreaDeInteresAPI } from '../api/areasInteres.api';
import { AreaInteres } from '../interfaces';

type UseAreasDeInteresReturn = {
  areas: AreaInteres[];
  cargando: boolean;
  error: AxiosError | null;
  fetchAreasDeInteres: () => Promise<void>;
  fetchSubareasByArea: (areaId: string) => Promise<void>;
  fetchAreaDeInteresById: (id: string) => Promise<AreaInteres | null>;
  createAreaDeInteres: (newArea: Omit<AreaInteres, 'id'>) => Promise<void>;
  updateAreaDeInteres: (id: string, updatedArea: Omit<AreaInteres, 'id'>) => Promise<void>;
  deleteAreaDeInteres: (id: string) => Promise<void>;
};

const useAreasDeInteres = (): UseAreasDeInteresReturn => {
  const [areas, setAreas] = useState<AreaInteres[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchAreasDeInteres = useCallback(async () => {
    setCargando(true);
    try {
      const data = await fetchAreasDeInteresAPI();
      setAreas(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchSubareasByArea = useCallback(async (areaId: string) => {
    setCargando(true);
    try {
      const data = await fetchSubareasPorAreaAPI(areaId);
      setAreas(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchAreaDeInteresById = async (id: string): Promise<AreaInteres | null> => {
    setCargando(true);
    try {
      const data = await fetchAreaDeInteresByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const createAreaDeInteres = async (newArea: Omit<AreaInteres, 'id'>) => {
    setCargando(true);
    try {
      const data = await createAreaDeInteresAPI(newArea);
      setAreas((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const updateAreaDeInteres = async (id: string, updatedArea: Omit<AreaInteres, 'id'>) => {
    setCargando(true);
    try {
      const data = await updateAreaDeInteresAPI(id, updatedArea);
      setAreas((prev) =>
        prev.map((area) => (area.id === id ? data : area))
      );
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const deleteAreaDeInteres = async (id: string) => {
    setCargando(true);
    try {
      await deleteAreaDeInteresAPI(id);
      setAreas((prev) => prev.filter((area) => area.id !== id));
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    fetchAreasDeInteres();
  }, [fetchAreasDeInteres]);

  return { areas, cargando, error, fetchAreasDeInteres, fetchSubareasByArea, fetchAreaDeInteresById, createAreaDeInteres, updateAreaDeInteres, deleteAreaDeInteres };
};

export default useAreasDeInteres;
