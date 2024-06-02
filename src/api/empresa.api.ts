import { objectToFormData } from '../utils';
import axios from './axios';

const formDataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export async function fetchGetEmpresa() {
  const response = await axios.get('/empresas/perfil');
  return response.data;
}

export async function fetchGetEmpresas(page: number = 1, limit: number = 10) {
  const response = await axios.get(`/empresas?page=${page}&limit=${limit}`);
  return response.data;
}

export async function fetchPostEmpresa(data: any) {
  const formData = objectToFormData(data);
  const response = await axios.post('empresas/registro', formData, formDataConfig);
  return response.data;
}