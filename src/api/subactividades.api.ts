import axios from "./axios";
import { SubActividad } from "../interfaces";



export const createSubActividad = async (
  newSubActividad: Omit<SubActividad, "id">
): Promise<SubActividad> => {
  const response = await axios.post("/sub-actividades/", newSubActividad);
  return response.data;
};

export const updateSubActividadById = async (
  id: string,
  updatedSubActividad: Omit<SubActividad, "id">
): Promise<SubActividad> => {
  const response = await axios.patch(
    `/sub-actividades/${id}`,
    updatedSubActividad
  );
  return response.data;
};

export const fetchSubActividadById = async (id: string): Promise<SubActividad> => {
  const response = await axios.get(`/sub-actividades/${id}`);
  return response.data;
};

export const deleteSubActividad = async (id: string): Promise<void> => {
  await axios.delete(`/sub-actividades/${id}`);
};
