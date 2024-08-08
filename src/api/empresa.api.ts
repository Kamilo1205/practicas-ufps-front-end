// servicios/empresa.api.ts
import axios from './axios';
import { objectToFormData } from '../utils';
import { Empresa, Tutor } from '../interfaces';
import { EmpresasResponse } from '../interfaces/responses.interface';

// Configuración para enviar datos en formato multipart/form-data
const formDataConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

// Obtener el perfil de una empresa
export const fetchGetEmpresa = async (): Promise<Empresa> => {
  const response = await axios.get('/empresas/perfil');
  return response.data;
}

// Obtener una lista paginada de empresas
export const fetchGetEmpresas = async (page: number = 1, limit: number = 10):Promise<EmpresasResponse>  => {
  const response = await axios.get(`/empresas?page=${page}&limit=${limit}`);
  return response.data;
}

// Registrar una nueva empresa
export const fetchPostEmpresa = async (createEmpresa: Omit<Empresa, 'id'>): Promise<Empresa> => {
  const formData = objectToFormData(createEmpresa);
  const response = await axios.post('/empresas/registro', formData, formDataConfig);
  return response.data;
}

// Actualizar una empresa existente
export const updateEmpresa = async (id: string, updateEmpresaDto: Partial<Omit<Empresa, 'id'>>): Promise<Empresa> => {
  const response = await axios.patch(`/empresas/${id}`, updateEmpresaDto);
  return response.data;
}

// Eliminar una empresa por ID
export const deleteEmpresa = async (id: string): Promise<void> => {
  await axios.delete(`/empresas/${id}`);
}

// Obtener los tutores de una empresa
export const fetchTutoresByEmpresaId = async (empresaId: string): Promise<Tutor[]> => {
  const response = await axios.get(`/empresas/${empresaId}/tutores`);
  return response.data;
}

interface DatosFormularioTutor {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccionTrabajo: string

}
// Agregar un tutor a una empresa
export const addTutorEmpresa = async (createTutorDto: DatosFormularioTutor): Promise<Tutor> => {
  const response = await axios.post(`/tutores`, createTutorDto);
  return response.data;
  }

// Agregar un tutor a una empresa
export const addTutorToEmpresaById = async (empresaId : string, createTutorDto: Partial<Omit<Tutor, 'id'>>): Promise<Tutor> => {
  const response = await axios.post(`/empresas/${empresaId}/tutores`, createTutorDto);
  return response.data;
}

// Obtener tutores de la empresa
export const getTutoresEmpresa = async (): Promise<Tutor[]> => {
  const response = await axios.get(`/empresas/tutores`);
  return response.data;
}

// Obtener tutores de empresas
export const getTutoresEmpresaById = async (empresaId: string): Promise<Tutor[]> => {
  const response = await axios.get(`/empresas/${empresaId}/tutores`);
  return response.data;
}

// Obtener una empresa por ID
export const fetchGetEmpresaById = async (id: string): Promise<Empresa> => {
  const response = await axios.get(`/empresas/${id}`);
  return response.data;
}

export const getTodosLosTutores = async (): Promise<Tutor[]> => {
  const response = await axios.get(`/tutores`);
  console.log(response.data);
  return response.data;
}
 
export const getPracticantesDeEmpresaApi = async (empresaId: string): Promise<any> => {
  const response = await axios.get(`/empresas/${empresaId}/practicantes`);
  console.log(response.data);
  return response.data;
}

export const asignarTutorEmpresaApi = async (asignacionId: string, tutorId: string): Promise<any> => {
  const response = await axios.patch(`/asignacion/${asignacionId}/asignar-tutor`, {  tutorId });
  console.log(response.data);
  return response.data;
}

export const deshabilitarTutorEmpresaApi = async (tutorId: string): Promise<any> => { 
  const response = await axios.patch(`empresas/deshabilitar-tutor/${tutorId}`);
  console.log(response.data);
  return response.data;
}
export const habilitarTutorEmpresaApi = async (tutorId: string): Promise<any> => { 
  const response = await axios.patch(`empresas/habilitar-tutor/${tutorId}`);
  console.log(response.data);
  return response.data;
}