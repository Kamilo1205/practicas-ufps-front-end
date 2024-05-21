import axios from './axios';

export async function fetchGetEps() {
  const response = await axios.get('/eps');
  return response.data;
}
