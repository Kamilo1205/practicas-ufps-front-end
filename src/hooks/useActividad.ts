import { useState } from "react";
import { AxiosError } from "axios";
import {
  fetchActividadById as fetchActByIdAPI,
  createActividad as createActAPI,
  updateActividadById as updateActAPI,
  deleteActividad as deleteActAPI,
} from "../api/actividades.api";
import { Actividad } from "../interfaces";

type UseActividadReturn = {
  actividad: Actividad | null;
  cargando: boolean;
  error: AxiosError | null;
  fetchActividadById: (id: string) => Promise<Actividad | null>;
  createActividad: (nuevoActividad: Omit<Actividad, "id">) => Promise<void>;
  updateActividad: (
    id: string,
    actividadActualizado: Omit<Actividad, "id">
  ) => Promise<void>;
  deleteActividad: (id: string) => Promise<void>;
};

const useActividad = (): UseActividadReturn => {
  const [actividad, setActividad] = useState<Actividad | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchActividadById = async (id: string): Promise<Actividad | null> => {
    setCargando(true);
    try {
      const data = await fetchActByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const createActividad = async (nuevaActividad: Omit<Actividad, "id">) => {
    setCargando(true);
    try {
      const data = await createActAPI(nuevaActividad);
      setActividad(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const updateActividad = async (
    id: string,
    actividadActualizada: Omit<Actividad, "id">
  ) => {
    setCargando(true);
    try {
      const data = await updateActAPI(id, actividadActualizada);
      setActividad(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const deleteActividad = async (id: string) => {
    setCargando(true);
    try {
      await deleteActAPI(id);
      setActividad(null);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  return {
    actividad,
    cargando,
    error,
    fetchActividadById,
    createActividad,
    updateActividad,
    deleteActividad,
  };
};

export default useActividad;