import axios from './axios';

const RUTAS_REPORTES = {
  reportesEstudiantesDelSemestreActual: 'reportes/estudiantes-semestre-actual',
  reportesEmpresasRegistradas: 'reportes/empresas',
  estudiantesSemestreActual: 'reportes/estudiantes-semestre-actual',
  asignacionesPorEstudiante: 'reportes/asignaciones-semestre-actual',
  asignacionesReportePorIdSemestre: 'reportes/asignaciones/',
  empresasConConvenioActivo: 'reportes/empresas-convenio',
  estudiantesRegistradosCantidad:'/estudiantes/contar'
}

export const reportesEstudiantesDelSemestreActualApi = async () => {
  const response = await axios.get(`${RUTAS_REPORTES.reportesEstudiantesDelSemestreActual}`,
    {
      responseType: 'blob',
    }
  );

  return response.data;
    
}
 
export const reportesEmpresasRegistradasApi = async () => {
  const response = await axios.get(`${RUTAS_REPORTES.reportesEmpresasRegistradas}`,
    {
      responseType: 'blob',
    }
  );

  return response.data;

}

export const reportesAsignacionesPorEstudianteApi = async () => { 
  const response = await axios.get(`${RUTAS_REPORTES.asignacionesPorEstudiante}`,
    {
      responseType: 'blob',
    }
  );

  return response.data;
}

export const reportesAsignacionesPorIdSemestreApi = async (idSemestre: string) => { 
  const response = await axios.get(`${RUTAS_REPORTES.asignacionesReportePorIdSemestre}${idSemestre}`,
    {
      responseType: 'blob',
    }
  );

  return response.data;
}


export const reportesEmpresasConConvenioActivoApi = async () => {
  const response = await axios.get(`${RUTAS_REPORTES.empresasConConvenioActivo}`,
    {
      responseType: 'blob',
    }
  );

  return response.data;
}

export const reporteNumeroDeEstudiantesApi = async () => { 
  const response = await axios.get(`${RUTAS_REPORTES.estudiantesRegistradosCantidad}`)
  return response.data;
}
