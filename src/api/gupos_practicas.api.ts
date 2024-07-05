import { Grupo } from '../interfaces/grupo.interface'
import axios from './axios'


const URLS = {
  URL:'/grupo-practicas'
} 

export const getGruposPracticasApi = async () => {
  const response = await axios.get(URLS.URL)
  console.log('grupos get api',response.data)
  return response.data
}

export const postGruposPracticasApi = async (data: Omit<Grupo,'id'>) => { 
  const response =  await axios.post(URLS.URL, data)
  console.log('grupo post api', response.data)
  return response.data
}

export const deleteGrupoPracticaApi = async (id: string) => {
  const response = await axios.delete(`${URLS.URL}/${id}`)
  console.log('grupo delete api', response.data)
  return response.data
}

export const asignarDocenteApi = async (idGrupo: string, docenteId: string | null) => {
  const response = await axios.patch(`${URLS.URL}/${idGrupo}/tutor/${docenteId}`)
  console.log('grupo put api', response.data)
  return response.data
}

export const registrarEstudiantesGrupoApi = async (idGrupo: string, arhivo: File) => {

  const response = await axios.post(`${URLS.URL}/${idGrupo}/estudiantes`, arhivo)
  console.log('grupo post api', response.data)
  return response.data
 }