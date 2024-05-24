import axios from './axios';

export async function fetchGetAreasDeInteresData() {
  const response = await axios.get('/areas-interes');
  return response.data;
}