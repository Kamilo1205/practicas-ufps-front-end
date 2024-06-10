import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { fetchCiudades as fetchCiudadesAPI,  fetchCiudadesByDepartamento as fetchCiudadesPorDepartamentoAPI, fetchCiudadById as fetchCiudadByIdAPI, createCiudad as createCiudadAPI, updateCiudad as updateCiudadAPI, deleteCiudad as deleteCiudadAPI } from '../api/ciudades.api';
import { Ciudad } from '../interfaces';

type UseCiudadesReturn = {
  ciudades: Ciudad[];
  cargando: boolean;
  error: AxiosError | null;
  fetchCiudades: (departamentoId?: string) => Promise<void>;
  fetchCiudadById: (id: string) => Promise<Ciudad | null>;
  createCiudad: (nuevaCiudad: Omit<Ciudad, 'id'>) => Promise<void>;
  updateCiudad: (id: string, ciudadActualizada: Omit<Ciudad, 'id'>) => Promise<void>;
  deleteCiudad: (id: string) => Promise<void>;
};

const useCiudades = (): UseCiudadesReturn => {
  const [ciudades, setCiudades] = useState<Ciudad[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchCiudades = useCallback(async (departamentoId?: string) => {
    setCargando(true);
    try {
      if (departamentoId) {
        const ciudadesData = await fetchCiudadesPorDepartamentoAPI(departamentoId);
        setCiudades(ciudadesData);
      } else {
        const todasLasCiudadesData = await fetchCiudadesAPI();
        setCiudades(todasLasCiudadesData);
      }
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchCiudadById = async (id: string): Promise<Ciudad | null> => {
    setCargando(true);
    try {
      const data = await fetchCiudadByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const createCiudad = async (nuevaCiudad: Omit<Ciudad, 'id'>) => {
    setCargando(true);
    try {
      const data = await createCiudadAPI(nuevaCiudad);
      setCiudades((prev) => [...prev, data]);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const updateCiudad = async (id: string, ciudadActualizada: Omit<Ciudad, 'id'>) => {
    setCargando(true);
    try {
      const data = await updateCiudadAPI(id, ciudadActualizada);
      setCiudades((prev) =>
        prev.map((ciudad) => (ciudad.id === id ? data : ciudad))
      );
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const deleteCiudad = async (id: string) => {
    setCargando(true);
    try {
      await deleteCiudadAPI(id);
      setCiudades((prev) => prev.filter((ciudad) => ciudad.id !== id));
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  return { ciudades, cargando, error, fetchCiudades, fetchCiudadById, createCiudad, updateCiudad, deleteCiudad };
};

export default useCiudades;
