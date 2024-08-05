import { useState } from "react";
import { AxiosError } from "axios";
import {
  fetchSubActividadById as fetchSubActByIdAPI,
  createSubActividad as createSubactAPI,
  updateSubActividadById as updateSubactAPI,
  deleteSubActividad as deleteSubactAPI,
} from "../api/subactividades.api";
import { SubActividad } from "../interfaces";

type UseSubActividadReturn = {
  subActividad: SubActividad | null;
  cargando: boolean;
  error: AxiosError | null;
  fetchSubActividadById: (id: string) => Promise<SubActividad | null>;
  createSubActividad: (
    nuevoActividad: Omit<SubActividad, "id">
  ) => Promise<{ ok: string; data: SubActividad }>;
  updateSubActividad: (
    id: string,
    actividadActualizado: SubActividad
  ) => Promise<{ ok: string; data: SubActividad }>;
  deleteSubActividad: (id: string) => Promise<string>;
};

const useSubActividad = (): UseSubActividadReturn => {
  const [subActividad, setSubActividad] = useState<SubActividad | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchSubActividadById = async (
    id: string
  ): Promise<SubActividad | null> => {
    setCargando(true);
    try {
      const data = await fetchSubActByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const createSubActividad = async (nuevaSubActividad: SubActividad) => {
    setCargando(true);
    try {
      const data = await createSubactAPI(nuevaSubActividad);
      setSubActividad(data);
      setError(null);
      return { ok: "ok", data: data };
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setCargando(false);
    }
  };

  const updateSubActividad = async (
    id: string,
    subActividadActualizada: Omit<SubActividad, "id">
  ) => {
    setCargando(true);
    try {
      const data = await updateSubactAPI(id, subActividadActualizada);
      setSubActividad(data);
      setError(null);
      return { ok: "ok", data: data };
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setCargando(false);
    }
  };

  const deleteSubActividad = async (id: string) => {
    setCargando(true);
    try {
      await deleteSubactAPI(id);
      setSubActividad(null);
      setError(null);
      return "ok";
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setCargando(false);
    }
  };

  return {
    subActividad,
    cargando,
    error,
    fetchSubActividadById,
    createSubActividad,
    updateSubActividad,
    deleteSubActividad,
  };
};

export default useSubActividad;
