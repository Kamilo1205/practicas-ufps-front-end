import axios from './axios';

export async function fetchGetDocumentoConvenio() {
  const response = await axios.get('/documentos/convenio', { responseType: 'blob' });
  return response.data;
}

export const fetchGetDocumentoPorId = async (fileId: string) => {
  const response = await axios.get(`/google-drive/${fileId}`, { responseType: 'blob' });
  console.log(response);
  return response.data;
 }