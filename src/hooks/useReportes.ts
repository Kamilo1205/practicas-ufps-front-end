import Swal from "sweetalert2";
import { reportesEstudiantesDelSemestreActualApi } from "../api/reportes.api"



export const useReportes = () => { 

  const getReportesEstudiantesDelSemestreActual = async () => { 

    try {
      return reportesEstudiantesDelSemestreActualApi();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
      })  
    }
  }


}