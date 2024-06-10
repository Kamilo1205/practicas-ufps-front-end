import axios from './axios';
import { Industria } from '../interfaces';

export const fetchIndustrias = async (): Promise<Industria[]> => {
  const response = await axios.get('/industrias');
  return response.data;
};

export const fetchIndustriaById = async (id: string): Promise<Industria> => {
  const response = await axios.get(`/industrias/${id}`);
  return response.data;
};

export const createIndustria = async (newIndustria: Omit<Industria, 'id'>): Promise<Industria> => {
  const response = await axios.post('/industrias', newIndustria);
  return response.data;
};

export const updateIndustria = async (id: string, updatedIndustria: Omit<Industria, 'id'>): Promise<Industria> => {
  const response = await axios.put(`/industrias/${id}`, updatedIndustria);
  return response.data;
};

export const deleteIndustria = async (id: string): Promise<void> => {
  await axios.delete(`/industrias/${id}`);
};
