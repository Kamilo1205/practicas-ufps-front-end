import { useCallback, useEffect, useState } from "react"

import { Solicitud,  SolicitudRequest } from "../schemas/solicitudSchema"
import { createSolicitudApi, eliminarSolicitudApi, fetchSolicitudesApi, fetchSolicitudesEmpresaApi, getAspirantesASolicitudApi } from "../api/solicitudes.api"
import { useAuth } from "../contexts"
import { roles } from "../interfaces/rol.interface"
import Swal from "sweetalert2"


export const useSolicitudes = () => {

  const { user } = useAuth()
  const esEmpresa = user?.roles.some(rol => rol.nombre == roles.empresa)
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [totalSolictudes, setTotalSolicitudes] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  console.log('solicitudes: ', solicitudes)
  const fetchSolicitudes = useCallback(async () => {
    return await fetchSolicitudesApi();
    
  }, []);

  const fetchSolicitudesEmpresa = useCallback(async () => {
    if (user && esEmpresa) {
      return await fetchSolicitudesEmpresaApi();
    }
  }, [user, esEmpresa]);

  useEffect(() => {
   

    if (user && esEmpresa) {
      fetchSolicitudesEmpresa().then(resp => {
        console.log('peti', resp)
        setSolicitudes(resp.data);
        setTotalSolicitudes(resp.meta.totalItems);
      })
    }
    else
    {
      fetchSolicitudes().then(resp => {
        console.log('peti2', resp)
        setSolicitudes(resp.data.sort((a,) => a.cantidadPracticantes > a.asignaciones.length ? 1 : -1));
        setTotalSolicitudes(resp.meta.totalItems);
      })
    }
  },[user,esEmpresa, fetchSolicitudesEmpresa, fetchSolicitudes])

  const createSolicitud = async (nuevaSolicitud:SolicitudRequest) => { 
    if (esEmpresa) {
      // Crear solicitud para empresa
      const peticion = await createSolicitudApi(nuevaSolicitud)
      console.log(peticion)
      setSolicitudes([...solicitudes, peticion])
      Swal.fire({
        title: 'Solicitud creada',
        text: 'La solicitud ha sido creada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    }
    else {
      setError('No se puede crear una solicitud si el usuario no es una empresa.')
    }
  }

  const eliminarSolicitud = async (solicitudId: string) => { 
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La solicitud será eliminada permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        const eliminar = await eliminarSolicitudApi(solicitudId)
        console.log(eliminar)
        setSolicitudes(solicitudes.filter(solicitud => solicitud.id !== solicitudId))
        Swal.fire({
          title: 'Solicitud eliminada',
          text: 'La solicitud ha sido eliminada exitosamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
      }
    })
    
  }

  const getAspirantesASolicitud = async (solicitudId: string) => { 

    const resp = await getAspirantesASolicitudApi(solicitudId)
    console.log('aspirantes', resp)
  }

  return {
    error,
    solicitudes,
    totalSolictudes,
    createSolicitud,
    eliminarSolicitud,
    getAspirantesASolicitud
    
  }
 } 