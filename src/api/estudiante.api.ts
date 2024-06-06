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


interface FetchGetEstudiantesParams {
  page?: number;
  limit?: number;
  grupo?: string;
  search?: string;
}

export async function fetchGetEstudiantes({ page = 1, limit = 10, grupo = '',search='' }: FetchGetEstudiantesParams={}) {
  const response = await axios.get(`/estudiantes?page=${page}&limit=${limit}&grupo=${grupo}&search=${search}`);
  return response.data;
}

export async function fetchPostEstudiante(data: any) {
  const response = await axios.post('estudiantes/registro', data);
  return response.data;
}