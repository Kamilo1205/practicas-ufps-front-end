import axios from './axios';

export async function fetchGetTipoDocumentosData() {
  const response = await axios.get('/tipo-documento');
  return response.data;
}
