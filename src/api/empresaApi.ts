import axios from './axios';

export async function fetchGetEmpresaData() {
  const response = await axios.get('/empresas/perfil');
  return response.data;
}

export async function fetchPostEmpresaData(data: FormData) {
  const response = await axios.post('empresas/registro/informacion-basica', data, {
    headers: {
      "Content-Type": "multipart/form-data",
      },
    });
  return response.data;
}

export async function fetchPatchEmpresaData(data: FormData) {
  const response = await axios.patch(`empresas/registro/informacion-basica`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      },
    });
  return response.data;
}
