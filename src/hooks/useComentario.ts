import { useState } from "react";
import { AxiosError } from "axios";
import {
  createComentario as createComentarioAPI,
  deleteComentario as deleteComentarioAPI,
  updateComentario as updateComentarioAPI,
} from "../api/comentario.apis";
import { Comentario } from "../interfaces";

type UseComentarioReturn = {
  comentario: Comentario | null;
  loading: boolean;
  error: AxiosError | null;
  createComentario: (
    newComentario: Comentario
  ) => Promise<{ ok: string; data: Comentario }>;
  deleteComentario: (Id?: string) => string;
  updateComentario: (
    comentario: Comentario
  ) => Promise<{ ok: string; data: Comentario }>;
};

const useComentario = (): UseComentarioReturn => {
  const [comentario, setComentario] = useState<Comentario | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const createComentario = async (
    newComentario: Comentario
  ): Promise<{ ok: string; data: Comentario } | string> => {
    setLoading(true);
    try {
      const data = await createComentarioAPI(newComentario);
      setComentario(data);
      setError(null);
      return { data: data, ok: "ok" };
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };

  const deleteComentario = async (Id?: string) => {
    setLoading(true);
    try {
      await deleteComentarioAPI(Id);
      setComentario(null);
      setError(null);
      return "ok";
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };

  const updateComentario = async (
    comentario: Comentario
  ): Promise<{ ok: string; data: Comentario } | string> => {
    setLoading(true);
    try {
      const data = await updateComentarioAPI(comentario);
      setComentario(data);
      setError(null);
      return { data: data, ok: "ok" };
    } catch (err) {
      setError(err as AxiosError);
      return "mal";
    } finally {
      setLoading(false);
    }
  };

  return {
    comentario,
    loading,
    error,
    createComentario,
    deleteComentario,
    updateComentario,
  };
};

export default useComentario;
