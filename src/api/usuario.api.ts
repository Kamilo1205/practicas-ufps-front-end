import axios from './axios';

export async function fetchGetUsuarios(page: number = 1, limit: number = 10) {
  const response = await axios.get(`/usuarios?page=${page}&limit=${limit}`);
  return response.data;
}

export async function fetchPostRegistroUsuario(usuarioRegistro: any) {
  const response = await axios.post('/auth/register', usuarioRegistro);
  return response.data;
}
