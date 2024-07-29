
import { Semestre } from '../schemas/semestreSchema'
import axios from './axios'

const URL = '/semestre/actual'

export const fetchSemestreApi = async ():Promise<Semestre> => { 

  const { data } = await axios.get(URL)
  return data
}

export const updateSemestreApi = async (semestre: Semestre): Promise<Semestre> => { 
  const { data } = await axios.patch(URL, semestre)
  return data
}