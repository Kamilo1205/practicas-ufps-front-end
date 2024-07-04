import { Docente } from '../interfaces/doncente.interface'
import axios from './axios'

const URL = 'tutor-institucional'

export const getDocentesApi = async ():Promise<Docente[]> => {
  const { data } = await axios.get(`${URL}`)
  return data
}
 

export const postDocenteApi = async (docente:Omit<Docente,'id'>) => { 
  const { data } = await axios.post(`${URL}`, docente)
  return data
}

export const eliminarDocenteApi = async (id:string) => { 
  const { data } = await axios.delete(`${URL}/${id}`)
  return data
}