import axios from './axios';

const formDataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export async function fetchGetEstudiante() {
  const response = await axios.get('/estudiantes/perfil');
  return response.data;
}

export async function fetchGetEstudiantes(page: number = 1, limit: number = 10) {
  const response = await axios.get(`/estudiantes?page=${page}&limit=${limit}`);
  return response.data;
}

export async function fetchPostEstudiante(data: any) {
  const response = await axios.post('estudiantes/registro', data);
  return response.data;
}