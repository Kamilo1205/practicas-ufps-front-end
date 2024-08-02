import { Comentario } from "../interfaces";
import axios from "./axios";

export const createComentario = async (
  newComentario: Omit<Comentario, "id">
): Promise<Comentario> => {
  const response = await axios.post("/comentarios/", newComentario);
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

export const updateComentario = async (
  comentario: Comentario
): Promise<void> => {
  await axios.patch(`/comentarios/${comentario.id}`, comentario.texto);
};
