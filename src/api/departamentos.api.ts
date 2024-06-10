import axios from './axios';
import { Departamento } from '../interfaces';

export const fetchDepartamentos = async (): Promise<Departamento[]> => {
  const response = await axios.get('/departamentos');
  return response.data;
};

export const fetchDepartamentoById = async (id: string): Promise<Departamento> => {
  const response = await axios.get(`/departamentos/${id}`);
  return response.data;
};

export const fetchDepartamentosByPaisNombre = async (paisNombre: string): Promise<Departamento[]> => {
  const response = await axios.get(`/departamentos/pais/nombre/${paisNombre}`);
  return response.data;
};

export const fetchDepartamentosByPais = async (paisId: string): Promise<Departamento[]> => {
  const response = await axios.get(`/departamentos/pais/${paisId}`);
  return response.data;
};

export const createDepartamento = async (newDepartamento: Omit<Departamento, 'id'>): Promise<Departamento> => {
  const response = await axios.post('/departamentos', newDepartamento);
  return response.data;
};

export const updateDepartamento = async (id: string, updatedDepartamento: Omit<Departamento, 'id'>): Promise<Departamento> => {
  const response = await axios.put(`/departamentos/${id}`, updatedDepartamento);
  return response.data;
};

export const deleteDepartamento = async (id: string): Promise<void> => {
  await axios.delete(`/departamentos/${id}`);
};
