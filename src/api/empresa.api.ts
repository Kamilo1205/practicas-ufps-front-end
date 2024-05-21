import { z } from 'zod';
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
  const formData = empresaFormData(data);
  const response = await axios.post('empresas/registro', formData, formDataConfig);
  return response.data;
}

export async function fetchPatchEmpresa(data: any) {
  const response = await axios.patch(`empresas/registro/informacion-basica`, data, formDataConfig);
  return response.data;
}

const empresaFormData = (data: z.infer<typeof EmpresaSchema>) => {
  const formData = new FormData(); 
  for (let campo in data) {
    if (data[campo] instanceof FileList) {
      const files = data[campo] as FileList;
      for (let i = 0; i < files.length; i++) {
        formData.append(campo, files[i]);
      }
    } else {
      formData.append(campo, data[campo] as string);
    }
  }
  return formData;
}