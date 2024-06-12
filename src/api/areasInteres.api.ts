import axios from './axios';
import { AreaInteres } from '../interfaces';

export const fetchAreasDeInteres = async (): Promise<AreaInteres[]> => {
  const response = await axios.get('/areas-interes');
  return response.data;
};

export const fetchSubareasByArea = async (areaId: string): Promise<AreaInteres[]> => {
  const response = await axios.get(`/areas-interes/${areaId}/subareas`);
  return response.data;
};

export const fetchAreaDeInteresById = async (id: string): Promise<AreaInteres> => {
  const response = await axios.get(`/areas-interes/${id}`);
  return response.data;
};

export const createAreaDeInteres = async (newArea: Omit<AreaInteres, 'id'>): Promise<AreaInteres> => {
  const response = await axios.post('/areas-interes', newArea);
  return response.data;
};

export const updateAreaDeInteres = async (id: string, updatedArea: Omit<AreaInteres, 'id'>): Promise<AreaInteres> => {
  const response = await axios.put(`/areas-interes/${id}`, updatedArea);
  return response.data;
};

export const deleteAreaDeInteres = async (id: string): Promise<void> => {
  await axios.delete(`/areas-interes/${id}`);
};
