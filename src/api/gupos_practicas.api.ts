import { Grupo } from '../interfaces/grupo.interface'
import axios from './axios'


const URLS = {
  URL:'/gupo_practicas'
} 

export const getGuposPracticas = async () => {
  return await axios.get(URLS.URL)
}

export const postGuposPracticas = async (data: Grupo) => { 
  return await axios.post(URLS.URL, data)
}

export const deleteGrupoPractica = async (id: string) => {
  return await axios.delete(`${URLS.URL}/${id}`)
}

