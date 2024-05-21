import axios from './axios';

export async function fetchGetDocumentoConvenio() {
  const response = await axios.get('/documentos/convenio', { responseType: 'blob' });
  return response.data;
}