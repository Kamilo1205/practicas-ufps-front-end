import axios from './axios';

export async function fetchGetTipoAfiliacionEpsData() {
  const response = await axios.get('/tipo-afiliacion-eps');
  return response.data;
}
