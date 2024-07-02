import { useEffect, useState } from "react";
import { useSemestre } from "./useSemestre";
import { Semestre } from "../schemas/semestreSchema";
import Swal from "sweetalert2";

import { useAuth } from "../contexts";

interface Notificacion {
  html: string;
  title: string;
}
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
interface ObjetosDeValidacion{
  semestre?: Semestre

}
const mostrarNotificacion = ({semestre}:ObjetosDeValidacion) => {
  if (semestre) {
    if (faltanFechas(semestre)) {
      dispararNotificacion("Hay fechas pendientes de configurar",
        '<a href="/coordinador/calendario" style="color: blue;">Ir al calendario</a>')
    }
  }
}
export const useConfigNotificaciones = () => {

  const {user} = useAuth()
  const {semestre} = useSemestre()
  //const [mostrarNotificacion, setMostrarNotificacion] = useState<boolean>(false);
  const [notificion, setNotificacion] = useState<Notificacion>('')

  useEffect(() => { 
    if(user?.roles.find(rol => rol.nombre === 'administrador')){
      mostrarNotificacion({semestre})
    }
  }, [semestre,user])

  return {
  
}
}