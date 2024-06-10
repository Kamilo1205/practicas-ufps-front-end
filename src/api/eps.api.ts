import axios from './axios';
import { Eps } from '../interfaces/eps.interface';

export const fetchEps = async (): Promise<Eps[]> => {
  const response = await axios.get('/eps');
  return response.data;
};

export const fetchEpsById = async (id: string): Promise<Eps> => {
  const response = await axios.get(`/eps/${id}`);
  return response.data;
};

export const createEps = async (newEps: Omit<Eps, 'id'>): Promise<Eps> => {
  const response = await axios.post('/eps', newEps);
  return response.data;
};

export const updateEps = async (id: string, updatedEps: Omit<Eps, 'id'>): Promise<Eps> => {
  const response = await axios.put(`/eps/${id}`, updatedEps);
  return response.data;
};

export const deleteEps = async (id: string): Promise<void> => {
  await axios.delete(`/eps/${id}`);
};
