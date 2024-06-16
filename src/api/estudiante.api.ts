import axios from './axios';
import { Estudiante } from '../interfaces/estudiante.interface';
import { objectToFormData } from '../utils';

// Configuración para enviar datos en formato multipart/form-data
const formDataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

// Obtener el perfil de un estudiante
export const fetchEstudiante = async (): Promise<Estudiante> => {
  const response = await axios.get('/estudiantes/perfil');
  return response.data;
};

// Obtener una lista paginada de estudiantes
export const fetchEstudiantes = async (page: number = 1, limit: number = 10, grupo: string = '', search: string = ''): Promise<{ data: Estudiante[], total: number }> => {
  const response = await axios.get(`/estudiantes?page=${page}&limit=${limit}&grupo=${grupo}&search=${search}`);
 console.log(response.data);
  return response.data;
};

// Registrar un nuevo estudiante
export const createEstudiante = async (nuevoEstudiante: Omit<Estudiante, 'id'>): Promise<Estudiante> => {
  console.log(nuevoEstudiante);
  const formData = objectToFormData(nuevoEstudiante);
  const response = await axios.post('/estudiantes/registro', formData, formDataConfig);
  return response.data;
};

// Actualizar un estudiante existente
export const updateEstudiante = async (id: string, estudianteActualizado: Partial<Omit<Estudiante, 'id'>>): Promise<Estudiante> => {
  const response = await axios.put(`/estudiantes/${id}`, estudianteActualizado, formDataConfig);
  return response.data;
};

// Eliminar un estudiante por ID
export const deleteEstudiante = async (id: string): Promise<void> => {
  await axios.delete(`/estudiantes/${id}`);
};

// Obtener un estudiante por ID
export const fetchEstudianteById = async (id: string): Promise<Estudiante> => {
  const response = await axios.get(`/estudiantes/${id}`);
  return response.data;
};
