import axios from './axios';

export async function fetchPostUsuarioLogin(usuarioLogin: any) {
  const response = await axios.post('/auth/login', usuarioLogin);
  return response.data;
}

export async function fetchPostRegistroUsuario(usuarioRegistro: any) {
  const response = await axios.post('/auth/register', usuarioRegistro);
  return response.data;
}

export async function fetchPostUsuarioLogout() {
  const response = await axios.post('/auth/logout');
  return response.data;
}

export async function fetchGetUsuarioPerfil() {
  const response = await axios.get('/auth/profile');
  return response.data;
}

export async function fetchPostUsuarioForgotPassword(data: any) {
  const response = await axios.post('/auth/forgot-password', data);
  return response.data;
}

export async function fetchPostUsuarioResetPassword(data: any) {
  const response = await axios.post('/auth/reset-password', data);
  return response.data;
}