import axios from './axios';

export async function fetchGetUsuarios() {
  const response = await axios.get('/usuarios');
  return response.data;
}

export async function fetchPostRegistroUsuario(usuarioRegistro: any) {
  const response = await axios.post('/auth/register', usuarioRegistro);
  return response.data;
}
