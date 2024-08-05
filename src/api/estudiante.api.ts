import axios from './axios';
import { Estudiante } from '../interfaces/estudiante.interface';
import { objectToFormData } from '../utils';
import { EstudiantesResponse } from '../interfaces/responses.interface';

// Configuración para enviar datos en formato multipart/form-data
const formDataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

// Obtener el perfil de un estudiante
export const fetchEstudiante = async (): Promise<Estudiante> => {
  const response = await axios.get('/estudiantes/perfil');
  console.log(response.data);
  return response.data;
};

// Obtener una lista paginada de estudiantes
export const fetchEstudiantes = async (page: number = 1, limit: number = 10, grupo: string = '', search: string = ''): Promise<EstudiantesResponse> => {
  //console.log(page, limit, grupo, search)
  const filtros = {
    grupoFiltro: grupo && grupo !== '' && grupo !== 'inactivo' ? `&filter.grupoMatriculado.nombre=${grupo}&filter.usuario.estaActivo=$eq:true` : '',
    estaInactivoFiltro: grupo === 'inactivo' ? `&filter.usuario.estaActivo=$eq:false` : '',

  }
  const response = await axios.get(`/estudiantes?page=${page}&limit=${limit}${filtros.grupoFiltro}${filtros.estaInactivoFiltro}&search=${search}`);
  //TODO: Tengo sospechas de que el search no está funcionando correctamente.
 console.log(response.data);
  return response.data;
};

// Registrar un nuevo estudiante
export const createEstudiante = async (nuevoEstudiante: Omit<Estudiante, 'id'>): Promise<Estudiante> => {
  console.log(nuevoEstudiante);
  const formData = objectToFormData(nuevoEstudiante);
  const response = await axios.patch('/estudiantes/registro', formData, formDataConfig);
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


export const createEstudiantesPorCSV = async (file: File,grupoId:string): Promise<Estudiante[]> => {
  const URL = `/csv/estudiantes/${grupoId}`;
  const formData = new FormData();
  formData.append('file', file);
  console.log('csv',formData);
  const response = await axios.post(URL, formData);
  console.log('csv resp', response)
  console.log('csv est',response.data); 
  return response.data;
 }