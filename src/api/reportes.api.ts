import axios from './axios';

export const reportesEstudiantesDelSemestreActualApi = async () => {
  const response = await axios.get(`reportes/estudiantes-semestre-actual`,
    {
      responseType: 'blob',
    }
  );
  console.log(response.data);
  return response.data;
    
}
 
export const resportesEmpresasRegistradasApi = async () => {
  const response = await axios.get(`reportes/empresas`,
    {
      responseType: 'blob',
    }
  );
  console.log(response.data);
  return response.data;

}

