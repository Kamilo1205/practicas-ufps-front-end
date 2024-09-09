import { useEffect, useState } from "react";
import { useSemestre } from "./useSemestre";
import { Semestre } from "../schemas/semestreSchema";
import Swal from "sweetalert2";


import { useAuth } from "../contexts";
import useEstudiantes from "./useEstudiantes";
import { Estudiante } from "../interfaces/estudiante.interface";
import { useGeneralConfig } from "./useGeneralConfig";
import { Decano } from "../interfaces/decano.interface";
import { fetchEstudiantes } from "../api/estudiante.api";
import { useGrupos } from "./useGrupos";



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

const mostrarNotificacion = ({ decano,semestre,estudiantes,pendientes,grupos }: ObjetosDeValidacion) => {
  

  let configPendientes = {...pendientes}
    if (!semestre || faltanFechas(semestre)) {
      configPendientes = {...pendientes,fechas: true}
      dispararNotificacion("Hay fechas pendientes de configurar",
        '<a href="/coordinador/calendario" style="color: blue;">Ir al calendario</a>')
      return;
  }
  
  if (grupos.find(g => !g.fechaEliminacion && !g.tutor)) {
    configPendientes = { ...pendientes, asignacionesGrupoDocente:  true}
    dispararNotificacion("Hay grupos sin asignar docente",
      '<a href="/coordinador/configuraciones" style="color: blue;">Ir a configuraciones</a>')
    return;
   }
 
  if(estudiantes.length === 0){
    configPendientes = { ...pendientes, estudiantes: true }
    dispararNotificacion("No hay estudiantes cargados",
      '<a href="/coordinador/estudiantes" style="color: blue;">Ir a estudiantes</a>')
    return;
  }

  if (!decano || decano.nombre === '' || decano.numeroDocumento === '') {
    configPendientes  ={ ...pendientes, decano: true }
    dispararNotificacion("No hay decano cargado",
      '<a href="/coordinador/configuraciones" style="color: blue;">Ir a configuraciones</a>')
    return;
  }

  console.log(configPendientes)
  return configPendientes
}
export const useConfigNotificaciones = () => {

  const {user} = useAuth()
  const { semestre } = useSemestre()
 const {grupos} = useGrupos()
  console.log(grupos)
  const {decano} = useGeneralConfig()
  const [seMostro, setSeMostro] = useState<boolean>(false);
  //const [notificion, setNotificacion] = useState<Notificacion>('')
  const [pendientes, setPendientes] = useState<ConfiguracionPendiente>({
    decano: false,
    fechas: false,
    asignacionesGrupoDocente: false,
    estudiantes: false
  })
  const mostrar = async () => { 
    
    const estudiantes = await fetchEstudiantes()
    const pendientesConf = mostrarNotificacion({
      decano,
      semestre,
      pendientes,
      estudiantes,
      grupos
    })
    console.log(pendientesConf)
    setPendientes(pendientesConf)
   
  }
  useEffect(() => { 
    if (user?.roles.find(rol => rol.nombre === 'administrador') && !seMostro && semestre && decano) {
      console.log('mostrar')
      setSeMostro(true)
      mostrar()
    }
  }, [semestre,user,decano])

  return {
    pendientes,
    setPendientes
}
}