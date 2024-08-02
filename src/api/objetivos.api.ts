import { Objetivos } from "../interfaces/objetivos.interface";
import axios from "./axios";

export const createInteObejtivos = async (
  newObjetivo: Omit<Objetivos, "id">
): Promise<Objetivos> => {
  const response = await axios.post("/objetivos/", newObjetivo);
  return response.data;
};

export const updatedObejtivos = async (
  updatedObjetivo: Objetivos
): Promise<Objetivos> => {
  const response = await axios.patch(
    `/objetivos/${updatedObjetivo.id}`,
    updatedObjetivo
  );
  return response.data;
};
