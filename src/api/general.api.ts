import { Decano } from '../interfaces/decano.interface'
import { Director } from '../interfaces/director.interface'
import axios from './axios'

const URL_DECANO = '/decano'
const URL_DIRECTOR = '/director'

export const getDecanoApi = async ():Promise<Decano> => {
  const response = await axios.get(URL_DECANO)
  return response.data
}


export const getDirector = async ():Promise<Director> => { 
  const response = await axios.get(URL_DIRECTOR)
  return response.data
}

export const postDecanoApi = async (data: Omit<Decano, 'id'>) => { 
  const response = await axios.post(URL_DECANO, data)
  return response.data
}

export const postDirectorApi = async (data: Omit<Director, 'id'>) => {
  const response = await axios.post(URL_DIRECTOR, data)
  return response.data
 }

export const actualizarDecanoApi = async (data: Decano) => {
  const response = await axios.patch(URL_DECANO, data)
  return response.data
}

export const actualizarDirectorApi = async (data: Director) => {
  const response = await axios.patch(URL_DIRECTOR, data)
  return response.data
}

export const deleteDecanoApi = async (id: string) => {
  const response = await axios.delete(`${URL_DECANO}/${id}`)
  return response.data
}