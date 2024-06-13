import axios from './axios';
import { buildQueryParams } from '../utils/buildQueryParams';
import { FetchParams, Usuario } from '../interfaces';

// Obtener una lista paginada de usuarios
export const fetchUsuarios = async (params: FetchParams = {}): Promise<{ data: Usuario[], total: number }> => {
  const queryParams = buildQueryParams(params);
  const response = await axios.get(`/usuarios?${queryParams}`);
  return response.data;
};

// Registrar un nuevo usuario
export const createUsuario = async (nuevoUsuario: Omit<Usuario, 'id'>): Promise<Usuario> => {
  const response = await axios.post('/auth/register', nuevoUsuario);
  return response.data;
};

// Obtener un usuario por ID
export const fetchUsuarioById = async (id: string): Promise<Usuario> => {
  const response = await axios.get(`/usuarios/${id}`);
  return response.data;
};

// Actualizar un usuario existente
export const updateUsuario = async (id: string, usuarioActualizado: Partial<Omit<Usuario, 'id'>>): Promise<Usuario> => {
  const response = await axios.put(`/usuarios/${id}`, usuarioActualizado);
  return response.data;
};

// Eliminar un usuario por ID
export const deleteUsuario = async (id: string): Promise<void> => {
  await axios.delete(`/usuarios/${id}`);
};
