import { Comentario } from "../interfaces";
import axios from "./axios";

export const createComentario = async (
  newComentario: Comentario
): Promise<Comentario> => {
  const response = await axios.post("/comentarios/", newComentario);
  return response.data;
};

export const deleteComentario = async (Id?: string) => {
  await axios.delete(`/comentarios/${Id}`);
};

export const updateComentario = async (
  comentario: Comentario
): Promise<Comentario> => {
  const response = await axios.patch(
    `/comentarios/${comentario.id}`,
    comentario
  );
  return response.data;
};
