import { Comentario } from "../interfaces";
import axios from "./axios";

export const createComentario = async (
  newIntensidad: Omit<Comentario, "id">
): Promise<Comentario> => {
  const response = await axios.post("/", newIntensidad);
  return response.data;
};

export const deleteObjetivoComentario = async (
  objetivoId: string
): Promise<void> => {
  await axios.post(`/comentarios/${objetivoId}`);
};

export const deleteActividadComentario = async (
  actividadId: string
): Promise<void> => {
  await axios.delete(`/comentarios/${actividadId}`);
};
