import { IntensidadHoraria } from "../interfaces";
import axios from "./axios";

export const createIntensidadHoraria = async (
  newIntensidad: Omit<IntensidadHoraria, "id">
): Promise<IntensidadHoraria> => {
  const response = await axios.post("/intensidad-horaria/", newIntensidad);
  return response.data;
};

export const updatedIntensidadHoraria = async (
  updatedIntensidad: Omit<IntensidadHoraria, "id">
): Promise<IntensidadHoraria> => {
  const response = await axios.patch(`/intensidad-horaria/`, updatedIntensidad);
  return response.data;
};
