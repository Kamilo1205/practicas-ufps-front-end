import axios from './axios';
import { AreaInteres } from '../interfaces';
import { Herramienta } from '../interfaces/herramienta.interface';
import { areaInteresHerramientas } from '../interfaces/area-interes.interface';

export const fetchAreasDeInteres = async (): Promise<AreaInteres[]> => {
  const response = await axios.get('/areas-interes');
  return response.data;
};

export const fetchSubareasByArea = async (areaId: string): Promise<AreaInteres[]> => {
  const response = await axios.get(`/areas-interes/${areaId}/subareas`);
  return response.data;
};

export const fetchAreaDeInteresById = async (id: string): Promise<AreaInteres> => {
  
  const response = await axios.get(`/areas-interes/${id}`);
  return response.data;
};

export const createAreaDeInteres = async (newArea: Omit<AreaInteres, 'id'>): Promise<AreaInteres> => {
  
  const response = await axios.post('/areas-interes', newArea);
  //console.log(response);
  //La API manda el objeto sin areaInteresHerramientas y sin subAreas, por lo que se lo agregamos
  return {
    ...response.data,
    areaInteresHerramientas: [],
    subAreas: [],
  
  };
};

export const updateAreaDeInteres = async (id: string, updatedArea: Omit<AreaInteres, 'id'>): Promise<AreaInteres> => {
  const response = await axios.put(`/areas-interes/${id}`, updatedArea);
  return response.data;
};

export const deleteAreaDeInteres = async (id: string): Promise<void> => {
  await axios.delete(`/areas-interes/${id}`);
};


export const createHerramientaApi = async (areaId: string, herramienta: Omit<Herramienta, 'id'>): Promise<areaInteresHerramientas> => { 
   return await axios.post(`/herramientas`, herramienta).then(async(resp) => {
    //console.log(resp.data)
    const herramientaId = resp.data.id
    const areaInteresHerramienta = {
      areaInteresId: areaId,
      herramientaId: herramientaId
    }
     const relacionAreaHerramienta = await axios.post(`/area-interes-herramientas`, areaInteresHerramienta)
     
    //console.log(relacionAreaHerramienta,'relacionAreaHerramienta')
     return relacionAreaHerramienta.data
  })
}

export const deleteHerramientaApi = async (herramientaId: string): Promise<void> => { 
  const response = await axios.delete(`/herramientas/${herramientaId}`)
  //La API no devuelve nada, por lo que agregar la fecha de eliminación.
  return {
    ...response.data,
    fechaEliminacion: new Date()
  }
}