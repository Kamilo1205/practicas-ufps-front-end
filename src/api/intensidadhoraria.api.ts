import { IntensidadHoraria } from "../interfaces";
import axios from "./axios";

export const createIntensidadHoraria = async (
  newIntensidad: Omit<IntensidadHoraria, "id">
): Promise<IntensidadHoraria> => {
  console.log(newIntensidad);
  const response = await axios.post("/intensidad-horaria/", newIntensidad);
  return response.data;
};

export const updatedIntensidadHoraria = async (
  updatedIntensidad: IntensidadHoraria
): Promise<IntensidadHoraria> => {
  const response = await axios.patch(
    `/intensidad-horaria/${updatedIntensidad.id}`,
    updatedIntensidad
  );
  return response.data;
};
