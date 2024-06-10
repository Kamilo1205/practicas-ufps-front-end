import axios from './axios';
import { Pais } from '../interfaces';

export const fetchPaises = async (): Promise<Pais[]> => {
  const response = await axios.get('/paises');
  return response.data;
};

export const fetchPaisById = async (id: string): Promise<Pais> => {
  const response = await axios.get(`/paises/${id}`);
  return response.data;
};

export const createPais = async (newPais: Omit<Pais, 'id'>): Promise<Pais> => {
  const response = await axios.post('/paises', newPais);
  return response.data;
};

export const updatePais = async (id: string, updatedPais: Omit<Pais, 'id'>): Promise<Pais> => {
  const response = await axios.put(`/paises/${id}`, updatedPais);
  return response.data;
};

export const deletePais = async (id: string): Promise<void> => {
  await axios.delete(`/paises/${id}`);
};
