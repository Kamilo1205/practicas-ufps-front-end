import { useEffect, useState } from "react";
import { useSemestre } from "./useSemestre";
import { Semestre } from "../schemas/semestreSchema";
import Swal from "sweetalert2";


import { useAuth } from "../contexts";
import useEstudiantes from "./useEstudiantes";
import { Estudiante } from "../interfaces/estudiante.interface";
import { useGeneralConfig } from "./useGeneralConfig";
import { Decano } from "../interfaces/decano.interface";



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
  console.log(fechas)
  const fechasFaltantes = fechas.filter(fecha => fecha === null)
  return fechasFaltantes.length > 0
}
const dispararNotificacion = (title: string, html: string) => {
  Toast.fire({
    icon: "warning",
    title,
    html,

  });
}


interface ConfiguracionPendiente{ 
  decano: boolean
  fechas: boolean
  asignacionesGrupoDocente: boolean 
  estudiantes: boolean
}

interface ObjetosDeValidacion {
  decano: Decano
  semestre?: Semestre
  estudiantes: Estudiante[]
  pendientes: ConfiguracionPendiente
  setPendientes: (pendientes: ConfiguracionPendiente) => void
}

const mostrarNotificacion = ({ decano,semestre,estudiantes,pendientes,setPendientes }: ObjetosDeValidacion) => {
  
    if (!semestre || faltanFechas(semestre)) {
      setPendientes({...pendientes,fechas: true})
      dispararNotificacion("Hay fechas pendientes de configurar",
        '<a href="/coordinador/calendario" style="color: blue;">Ir al calendario</a>')
      return;
  }
    else {
      setPendientes({...pendientes,fechas: false})
  }
  
  //TODO: Validar si hay asignaciones de grupo docente pendientes
  setPendientes({ ...pendientes, asignacionesGrupoDocente: true })
 
  if(estudiantes.length === 0){
    setPendientes({ ...pendientes, estudiantes: true })
    dispararNotificacion("No hay estudiantes cargados",
      '<a href="/coordinador/estudiantes" style="color: blue;">Ir a estudiantes</a>')
    return;
  }
  else setPendientes({ ...pendientes, estudiantes: false })

  if (!decano || decano.nombre === '' || decano.numeroDocumento === '') {
    setPendientes({ ...pendientes, decano: true })
    dispararNotificacion("No hay decano cargado",
      '<a href="/coordinador/configuraciones" style="color: blue;">Ir a configuraciones</a>')
    return;
  }
  else setPendientes({ ...pendientes, decano: false })

}
export const useConfigNotificaciones = () => {

  const {user} = useAuth()
  const { semestre } = useSemestre()
  const { estudiantes } = useEstudiantes()
  const {decano} = useGeneralConfig()
  const [seMostro, setSeMostro] = useState<boolean>(false);
  //const [notificion, setNotificacion] = useState<Notificacion>('')
  const [pendientes, setPendientes] = useState<ConfiguracionPendiente>({
    decano: true,
    fechas: true,
    asignacionesGrupoDocente: true,
    estudiantes: true
  })

  useEffect(() => { 
    if (user?.roles.find(rol => rol.nombre === 'administrador') && !seMostro) {
      setSeMostro(true)
      mostrarNotificacion({
        decano,
        semestre,
        pendientes,
        estudiantes,
        setPendientes
      })
    }
  }, [semestre,user,decano,estudiantes,pendientes])

  return {
    pendientes,
    setPendientes
}
}