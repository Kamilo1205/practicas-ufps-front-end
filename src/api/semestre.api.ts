
import { Semestre } from '../schemas/semestreSchema'
import axios from './axios'

const URL = '/semestre/actual'
const URL_SEMESTRES = '/semestre'

export const fetchSemestreApi = async ():Promise<Semestre> => { 

  const { data } = await axios.get(URL)
  return data
}

export const updateSemestreApi = async (semestre: Omit<Semestre,'id'>): Promise<Semestre> => { 
  const { data } = await axios.patch(URL, semestre)
  return data
}

export const fetchSemestresApi = async ():Promise<Semestre[]> => { 
  const { data } = await axios.get(URL_SEMESTRES)
  return data
}