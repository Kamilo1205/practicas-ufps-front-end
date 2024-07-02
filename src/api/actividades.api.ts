import axios from "./axios";
import { Actividad } from "../interfaces";

export const createActividad = async (
  newActividad: Omit<Actividad, "id">
): Promise<Actividad> => {
  const response = await axios.post("/actividades/", newActividad);
  return response.data;
};

export const updateActividadById = async (
  id: string,
  updatedActividad: Omit<Actividad, "id">
): Promise<Actividad> => {
  const response = await axios.patch(`/actividades/${id}`, updatedActividad);
  return response.data;
};

export const fetchActividadById = async (id: string): Promise<Actividad> => {
  const response = await axios.get(`/actividades/${id}`);
  return response.data;
};

export const deleteActividad = async (id: string): Promise<void> => {
  await axios.delete(`/actividades/${id}`);
};
