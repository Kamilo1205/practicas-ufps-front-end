
import axios from './axios';

const rutaArl = '/estudiantes/export'

export const enviarArlApi = async () => {

  const response = await axios.get(rutaArl)
  return response.data
 }