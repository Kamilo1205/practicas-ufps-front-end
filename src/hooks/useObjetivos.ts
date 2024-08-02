import { useState } from "react";
import { AxiosError } from "axios";
import {
  createInteObejtivos as createObjAPI,
  updatedObejtivos as updateObjAPI,
} from "../api/objetivos.api";
import { Objetivos } from "../interfaces";

type UseObjetivosReturn = {
  objetivos?: Objetivos;
  loading: boolean;
  error: AxiosError | null;
  createObjetivo: (newObj: Omit<Objetivos, "id">) => Promise<void>;
  updateObjetivo: (updatedObjt: Objetivos) => Promise<void>;
};

const useObjetivos = (): UseObjetivosReturn => {
  const [objetivos, setObjs] = useState<Objetivos>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const createObjetivo = async (newObj: Omit<Objetivos, "id">) => {
    setLoading(true);
    try {
      const data = await createObjAPI(newObj);
      setObjs(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const updateObjetivo = async (updatedObj: Objetivos) => {
    setLoading(true);
    try {
      const data = await updateObjAPI(updatedObj);
      setObjs(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return {
    objetivos,
    loading,
    error,
    createObjetivo,
    updateObjetivo,
  };
};

export default useObjetivos;
