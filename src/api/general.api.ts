import { Decano } from '../interfaces/decano.interface'
import axios from './axios'

const URL_DECANO = '/decano'

export const getDecanoApi = async ():Promise<Decano> => {
  const response = await axios.get(URL_DECANO)
  return response.data
 }