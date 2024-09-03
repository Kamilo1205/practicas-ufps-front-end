import Swal from "sweetalert2";
import { reporteNumeroDeEstudiantesApi, reportesAsignacionesPorEstudianteApi, reportesAsignacionesPorIdSemestreApi, reportesEmpresasConConvenioActivoApi, reportesEmpresasRegistradasApi, reportesEstudiantesDelSemestreActualApi } from "../api/reportes.api"



export const useReportes = () => { 

  const armarReporte = async (getReporte: () => Promise<any>,nombreDoc:string) => {
    try {
      Swal.fire({
        title: 'Generando...',
        text: 'Por favor, espere.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const pdfBlob = await getReporte();
      Swal.close();
      // Crear una URL para el archivo PDF
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));

      // Crear un enlace para la descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${nombreDoc}.pdf`);

      // Añadir el enlace al DOM y hacer clic en él
      document.body.appendChild(link);
      link.click();

      // Limpiar el DOM después de la descarga
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      Swal.close()
    }
  }
  const getReportesEstudiantesDelSemestreActual = async () => {
    armarReporte(reportesEstudiantesDelSemestreActualApi,'estudiantesDelSemestreActual')
  };

  const getReportesEmpresasRegistradas = async () => { 
      armarReporte(reportesEmpresasRegistradasApi,'empresasRegistradas')
  }

  const getAsignacionesPorEstudiante = async () => {
    armarReporte(reportesAsignacionesPorEstudianteApi,'asignacionesPorEstudiante')
   }
  
  const getAsignacionesPorSemestreId = async (idSemestre: string) => {
    armarReporte(() => reportesAsignacionesPorIdSemestreApi(idSemestre),'asignacionesPorSemestre')
  }

  const getCantidadesEstudiantes = async () => { 
    try {
      const response = await reporteNumeroDeEstudiantesApi();
      return response;
    } catch (error) {
      console.error('Error al obtener la cantidad de estudiantes:', error);
    }
  }
  
  const getReportesEmpresasConConvenioActivo = async () => { 
    armarReporte(reportesEmpresasConConvenioActivoApi,'empresasConConvenioActivo')
  }

  return {
    getCantidadesEstudiantes,
    getAsignacionesPorEstudiante,
    getReportesEmpresasRegistradas,
    getAsignacionesPorSemestreId,
    getReportesEmpresasConConvenioActivo,
    getReportesEstudiantesDelSemestreActual,
    
  }
}