import { useEffect, useState } from "react";
import { useSemestre } from "./useSemestre";
import { Semestre } from "../schemas/semestreSchema";
import Swal from "sweetalert2";


import { useAuth } from "../contexts";
import useEstudiantes from "./useEstudiantes";
import { Estudiante } from "../interfaces/estudiante.interface";



const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 100000,
  timerProgressBar: true,
  showCloseButton: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

const faltanFechas = (semestre: Semestre) =>{
  const {fechaInicio, fechaFin, fechaInicioPlanDeTrabajo, fechaFinPlanDeTrabajo, fechaInicioPrimerInforme, fechaFinPrimerInforme, fechaInicioInformeFinal, fechaFinInformeFinal} = semestre
  const fechas = [fechaInicio, fechaFin, fechaInicioPlanDeTrabajo, fechaFinPlanDeTrabajo, fechaInicioPrimerInforme, fechaFinPrimerInforme, fechaInicioInformeFinal, fechaFinInformeFinal]
  const fechasFaltantes = fechas.filter(fecha => fecha === null)
  return fechasFaltantes.length > 0
}
const dispararNotificacion = (title: string, html: string) => {
  Toast.fire({
    icon: "warning",
    title,
    html

  });
}


interface ConfiguracionPendiente{ 
  fechas: boolean
  asignacionesGrupoDocente: boolean 
  estudiantes: boolean
}

interface ObjetosDeValidacion {
  semestre?: Semestre
  estudiantes: Estudiante[]
  pendientes: ConfiguracionPendiente
  setPendientes: (pendientes: ConfiguracionPendiente) => void
}

const mostrarNotificacion = ({ semestre,estudiantes,pendientes,setPendientes }: ObjetosDeValidacion) => {
  if (semestre) {
    if (faltanFechas(semestre)) {
      setPendientes({...pendientes,fechas: true})
      dispararNotificacion("Hay fechas pendientes de configurar",
        '<a href="/coordinador/calendario" style="color: blue;">Ir al calendario</a>')
      return;
    }
  }
  //TODO: Validar si hay asignaciones de grupo docente pendientes
  setPendientes({ ...pendientes, asignacionesGrupoDocente: true })
  //TODO: Validar si no hay estudiantes.
  if(estudiantes.length === 0){
    setPendientes({ ...pendientes, estudiantes: true })
    dispararNotificacion("No hay estudiantes cargados",
      '<a href="/coordinador/estudiantes" style="color: blue;">Ir a estudiantes</a>')
    return;
  }
}
export const useConfigNotificaciones = () => {

  const {user} = useAuth()
  const { semestre } = useSemestre()
const {estudiantes } = useEstudiantes()
  //const [mostrarNotificacion, setMostrarNotificacion] = useState<boolean>(false);
  //const [notificion, setNotificacion] = useState<Notificacion>('')
  const [pendientes, setPendientes] = useState<ConfiguracionPendiente>({
    fechas: false,
    asignacionesGrupoDocente: false,
    estudiantes: false
  })

  useEffect(() => { 
    if(user?.roles.find(rol => rol.nombre === 'administrador')){
      mostrarNotificacion({
        semestre,
        pendientes,
        estudiantes,
        setPendientes
      })
    }
  }, [semestre,user])

  return {
    pendientes,
    setPendientes
}
}