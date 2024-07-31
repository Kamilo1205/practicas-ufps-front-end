import axios from "./axios";


import {  SolicitudRequest, SolicitudesResponse } from "../schemas/solicitudSchema";
import Swal from "sweetalert2";

const SOLICITUDES_URL_COORDINADOR = '/empresas-solicitudes'
const SOLICITUDES_URL_EMPRESA = '/empresas-solicitudes/empresa'
const URL_EMPRESA_ASPIRANTES = '/mejores-estudiantes'
const URL_ASIGNACION = '/asignacion'

const getUrlParaSolicitudDeEmpresa = (solicitudId: string) => `empresas-solicitudes/${solicitudId}/empresa`

export const fetchSolicitudesApi = async (): Promise<SolicitudesResponse> => { 
  const response = await axios.get(SOLICITUDES_URL_COORDINADOR)
  return response.data
}

export const fetchSolicitudesEmpresaApi = async () => { 
  const response = await axios.get(`${SOLICITUDES_URL_EMPRESA}`)
  return response.data
}

export const getSolicitudPorIdApi = async (solicitudId: string) => { 
  const response = await axios.get(getUrlParaSolicitudDeEmpresa(solicitudId))
  return response.data
}

export const createSolicitudApi = async (solicitud: SolicitudRequest) => { 
  const response = await axios.post(SOLICITUDES_URL_COORDINADOR, solicitud).catch((error) => { 
    Swal.fire({
      title: 'Error',
      text: 'No se pudo crear la solicitud',
      icon: 'error',
    })
  })
  console.log('response', response.data)
  return response.data
}

export const eliminarSolicitudApi = async (solicitudId: string) => { 
  const response = await axios.delete(`${SOLICITUDES_URL_EMPRESA}/${solicitudId}`)
  return response.data
}

export const getAspirantesASolicitudApi = async (solicitudId: string) => {
  const response = await axios.get(`${SOLICITUDES_URL_COORDINADOR}/${solicitudId}${URL_EMPRESA_ASPIRANTES}`)
  return response.data
 }

export const asignarPracticanteApi = async (solicitudId: string, estudianteId: string) => { 
  const response = await axios.post(`${URL_ASIGNACION}`, { solicitudId, estudianteId })
  return response.data
}