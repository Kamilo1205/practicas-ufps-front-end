import { useState } from "react";
import { AxiosError } from "axios";
import {
  createComentario as createComentarioAPI,
  deleteObjetivoComentario as deleteObjetivoComentarioAPI,
  deleteActividadComentario as deleteActividadComentarioAPI,
  updateComentario as updateComentarioAPI,
} from "../api/comentario.apis";
import { Comentario } from "../interfaces";

type UseComentarioReturn = {
  comentario: Comentario | null;
  loading: boolean;
  error: AxiosError | null;
  createComentario: (newComentario: Omit<Comentario, "id">) => Promise<void>;
  deleteObjComentario: (objetivoId: string) => Promise<void>;
  deleteActComentario: (actividadId: string) => Promise<void>;
  updateComentario: (comentario: Comentario) => Promise<void>;
};

const useComentario = (): UseComentarioReturn => {
  const [comentario, setComentario] = useState<Comentario | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const createComentario = async (newComentario: Omit<Comentario, "id">) => {
    setLoading(true);
    try {
      const data = await createComentarioAPI(newComentario);
      setComentario(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const deleteObjComentario = async (objetivoId: string) => {
    setLoading(true);
    try {
      await deleteObjetivoComentarioAPI(objetivoId);
      setComentario(null);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const deleteActComentario = async (actividadId: string) => {
    setLoading(true);
    try {
      await deleteActividadComentarioAPI(actividadId);
      setComentario(null);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  const updateComentario = async (comentario: Comentario) => {
    setLoading(true);
    try {
      const data = await updateComentarioAPI(comentario);
      setComentario(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  };

  return {
    comentario,
    loading,
    error,
    createComentario,
    deleteObjComentario,
    deleteActComentario,
    updateComentario,
  };
};

export default useComentario;
