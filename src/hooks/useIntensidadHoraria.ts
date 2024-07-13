import { useState } from "react";
import { AxiosError } from "axios";
import {
  createIntensidadHoraria as createIntensidadAPI,
  updatedIntensidadHoraria as updateIntensidadaAPI,
} from "../api/intensidadhoraria.api";
import { IntensidadHoraria } from "../interfaces";

type UseIntensidadReturn = {
  intensidad?: IntensidadHoraria;
  loading: boolean;
  error: AxiosError | null;
  createIntensidad: (
    newIntensidad: Omit<IntensidadHoraria, "id">
  ) => Promise<void>;
  updateIntensidad: (
    updatedIntensidad: Omit<IntensidadHoraria, "id">
  ) => Promise<void>;
};

const useIntensidad = (): UseIntensidadReturn => {
  const [intensidad, setIntensidad] = useState<IntensidadHoraria>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const createIntensidad = async (
    newIntensidad: Omit<IntensidadHoraria, "id">
  ) => {
    setLoading(true);
    try {
      const data = await createIntensidadAPI(newIntensidad);
      setIntensidad(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const updateIntensidad = async (
    updatedIntensidad: Omit<IntensidadHoraria, "id">
  ) => {
    setLoading(true);
    try {
      const data = await updateIntensidadaAPI(updatedIntensidad);
      setIntensidad(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return {
    intensidad,
    loading,
    error,
    createIntensidad,
    updateIntensidad,
  };
};

export default useIntensidad;