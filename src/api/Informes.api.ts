import { primerInforme } from "../interfaces/primerInforme";
import axios from "./axios";

export const createPrimerInforme = async (
  newInforme: primerInforme
): Promise<primerInforme> => {
  const response = await axios.post("plan-trabajo/primer-informe", newInforme);
  return response.data;
};

export const createFinalInforme = async (
  newInforme: primerFinal
): Promise<primerInforme> => {
  const response = await axios.post("plan-trabajo/informe-final", newInforme);
  return response.data;
};

export const updateInformeFinal = async (
  idInforme: string,
  informe: primerFinal
): Promise<primerFinal> => {
  const response = await axios.patch(`/informe/${idInforme}`, informe);
  return response.data;
};

export const updateInformePrimer = async (
  idInforme: string,
  informe: primerInforme
): Promise<primerInforme> => {
  const response = await axios.patch(`/informe/${idInforme}`, informe);
  return response.data;
};

export const updateDiagramaInforme = async (file: File, id: string) => {
   const formData = new FormData();
   formData.append("file", file);
  const response = await axios.post(`informe/${id}/diagrama-Gantt`, formData);
  return response.data;
};
