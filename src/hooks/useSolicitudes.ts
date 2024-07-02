import { useCallback, useEffect, useState } from "react"

import { Solicitud,  SolicitudRequest } from "../schemas/solicitudSchema"
import { createSolicitudApi, fetchSolicitudesApi, fetchSolicitudesEmpresaApi } from "../api/solicitudes.api"
import { useAuth } from "../contexts"
import { roles } from "../interfaces/rol.interface"


export const useSolicitudes = () => {

  const { user } = useAuth()
  const esEmpresa = user?.roles.some(rol => rol.nombre == roles.empresa)
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [totalSolictudes, setTotalSolicitudes] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const fetchSolicitudes = useCallback(async () => {
    return await fetchSolicitudesApi();
    
  }, []);

  const fetchSolicitudesEmpresa = useCallback(async () => {
    if (user && esEmpresa) {
      return await fetchSolicitudesEmpresaApi(user.id);
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
        setSolicitudes(resp.data);
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
    }
    else {
      setError('No se puede crear una solicitud si el usuario no es una empresa.')
    }
  }

  return {
    error,
    solicitudes,
    totalSolictudes,
    createSolicitud,
  }
 } 