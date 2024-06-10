import axios from './axios';
import { Ciudad } from '../interfaces';

export const fetchCiudades = async (): Promise<Ciudad[]> => {
  const response = await axios.get('/ciudades');
  return response.data;
};

export const fetchCiudadesByDepartamento = async (departamentoId: string): Promise<Ciudad[]> => {
  const response = await axios.get(`/ciudades/departamento/${departamentoId}`);
  return response.data;
};

export const fetchCiudadById = async (id: string): Promise<Ciudad> => {
  const response = await axios.get(`/ciudades/${id}`);
  return response.data;
};

export const createCiudad = async (newIndustria: Omit<Ciudad, 'id'>): Promise<Ciudad> => {
  const response = await axios.post('/ciudades', newIndustria);
  return response.data;
};

export const updateCiudad = async (id: string, updatedIndustria: Omit<Ciudad, 'id'>): Promise<Ciudad> => {
  const response = await axios.put(`/ciudades/${id}`, updatedIndustria);
  return response.data;
};

export const deleteCiudad = async (id: string): Promise<void> => {
  await axios.delete(`/ciudades/${id}`);
};
