import axios from './axios';

export async function fetchGetTipoDocumentoData() {
  const response = await axios.get('/tipo-documento');
  return response.data;
}
