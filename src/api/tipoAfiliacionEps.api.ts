import axios from './axios';
import { TipoAfiliacionEps } from '../interfaces/tipo-afiliacion-eps.interface';

export const fetchTipoAfiliacionEps = async (): Promise<TipoAfiliacionEps[]> => {
  const response = await axios.get('/tipo-afiliacion-eps');
  return response.data;
};

export const fetchTipoAfiliacionEpsById = async (id: string): Promise<TipoAfiliacionEps> => {
  const response = await axios.get(`/tipo-afiliacion-eps/${id}`);
  return response.data;
};

export const createTipoAfiliacionEps = async (newTipoAfiliacionEps: Omit<TipoAfiliacionEps, 'id'>): Promise<TipoAfiliacionEps> => {
  const response = await axios.post('/tipo-afiliacion-eps', newTipoAfiliacionEps);
  return response.data;
};

export const updateTipoAfiliacionEps = async (id: string, updatedTipoAfiliacionEps: Omit<TipoAfiliacionEps, 'id'>): Promise<TipoAfiliacionEps> => {
  const response = await axios.put(`/tipo-afiliacion-eps/${id}`, updatedTipoAfiliacionEps);
  return response.data;
};

export const deleteTipoAfiliacionEps = async (id: string): Promise<void> => {
  await axios.delete(`/tipo-afiliacion-eps/${id}`);
};
