// src/components/SubActivity.tsx
import React, { useState } from "react";
import { SubActivity as SubActivityType } from "../types";
import { MdEdit, MdDelete } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { FaRegCalendar } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { GiProgression } from "react-icons/gi";

import { TfiSave } from "react-icons/tfi";
import { Label } from "../../ui";
import NumberSlider from "../../ui/Input/NumberSlider";
import PopOverViewInfo from "../../ui/Dialog/PopOverViewInfo";
import { RiEyeCloseFill } from "react-icons/ri";
import { BiShowAlt } from "react-icons/bi";
import { SubActividad } from "../../../interfaces";

interface SubActivityProps {
  subActivity: SubActividad;
  updateSubActivity: (subActivity: SubActividad) => void;
  deleteSubActivity: (id: string) => void;
  rol: boolean;
  informeP: boolean;
}

export const SubActivity: React.FC<SubActivityProps> = ({
  subActivity,
  updateSubActivity,
  deleteSubActivity,
  rol,
  informeP = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [titulo, settitulo] = useState(subActivity.titulo);
  const [descripcion, setdescripcion] = useState(subActivity.descripcion);
  const [fechaInicio, setfechaInicio] = useState(subActivity.fechaInicio);
  const [fechFin, setfechFin] = useState(subActivity.fechFin);
  const [totalHoras, settotalHoras] = useState(Number(subActivity.totalHoras));
  const [porcentajeCompletado, setporcentajeCompletado] = useState(
    Number(subActivity.porcentajeCompletado)
  );
  const [OpenView, setOpenView] = useState(false);
  const InicioDate = new Date(subActivity.fechaInicio);

  const FinDate = new Date(subActivity.fechFin);

  const InicioDateAdjusted = new Date(InicioDate.getTime());
  InicioDateAdjusted.setDate(InicioDateAdjusted.getDate() + 1);

  const FinDateAdjusted = new Date(FinDate.getTime());
  FinDateAdjusted.setDate(FinDateAdjusted.getDate() + 1);

  // Formatear las fechas ajustadas
  const formattedfechaInicio = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    day: "numeric",
  }).format(InicioDateAdjusted);

  const formattedfechFin = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    day: "numeric",
  }).format(FinDateAdjusted);
  console.log(subActivity);
  const handleEdit = () => {
    const updatedSubActivity = {
      ...subActivity,
      titulo,
      descripcion,
      fechaInicio,
      fechFin,
      totalHoras: String(totalHoras),
      porcentajeCompletado: String(porcentajeCompletado),
    };
    updateSubActivity(updatedSubActivity);
    setIsEditing(false);
  };
  const togglePopover = () => {
    setOpenView(!OpenView);
  };

  return (
    <div className="flex justify-between items-center py-2">
      {isEditing ? (
        <div className="w-full border rounded">
          <div className="w-full flex justify-end mt-2">
            <button
              className="text-white bg-red-500 rounded mr-4"
              onClick={() => setIsEditing(!isEditing)}
            >
              <VscChromeClose style={{ width: 20, height: 20 }} />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 p-4 rounded-lg w-full">
            <div className="col-span-1 lg:col-span-6 flex flex-col">
              <Label>Título de Subactividad</Label>
              <input
                id="titulo"
                type="text"
                disabled={informeP}
                value={titulo}
                onChange={(e) => settitulo(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>

            <div className="col-span-1 lg:col-span-3 flex flex-col">
              <Label>Inicio</Label>
              <input
                id="start-date"
                type="date"
                value={fechaInicio}
                disabled={informeP}
                onChange={(e) => setfechaInicio(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>

            <div className="col-span-1 lg:col-span-3 flex flex-col">
              <Label>Fin</Label>
              <input
                id="end-date"
                type="date"
                min={fechaInicio}
                disabled={informeP}
                value={fechFin}
                onChange={(e) => setfechFin(e.target.value)}
                className="border rounded px-3 py-2 w-full"
                required
              />
            </div>
            <div className="col-span-1 lg:col-span-9 flex flex-col">
              <Label>Descripción de la Subactividad</Label>
              <textarea
                id="descripcion"
                value={descripcion}
                disabled={informeP}
                onChange={(e) => setdescripcion(e.target.value)}
                className="border rounded px-3 py-2 w-full resize-none"
                rows={6}
                required
              />
            </div>

            <div className="col-span-1 lg:col-span-3 flex flex-col">
              <div>
                <Label>Horas</Label>
                <input
                  id="totalHoras"
                  min={0}
                  type="number"
                  placeholder="Horas"
                  disabled={informeP}
                  value={totalHoras}
                  onChange={(e) => settotalHoras(Number(e.target.value))}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div className="mt-1 mb-1">
                <NumberSlider
                  progreso={porcentajeCompletado}
                  setProgreso={setporcentajeCompletado}
                />
              </div>
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white rounded px-2 py-1 mt-2 flex"
                style={{ justifyContent: "center", alignItems: "center" }}
              >
                <TfiSave className="mt-1 mr-1" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full"
          style={{
            border: "1px solid rgb(209 213 219 )",
            borderRadius: "7px",
            padding: 5,
          }}
        >
          <div className="flex w-full">
            <div className="flex  w-full ">
              <div style={{ fontWeight: 600 }} className="mt-2">
                <span>{subActivity.titulo}</span>
              </div>
              <div
                className="flex w-full justify-end"
                style={{ alignItems: "center" }}
              >
                <div
                  className="flex px-2 py-1 hidden md:flex"
                  style={{ borderRadius: "15px", border: "1px solid gray" }}
                >
                  <FaRegCalendar className="mt-1 mr-1 " />
                  <span className="xl:hidden">{formattedfechFin}</span>
                  <span className="hidden xl:inline">
                    {formattedfechaInicio} - {formattedfechFin}
                  </span>
                </div>
                <div
                  className="flex px-2 py-1 hidden md:flex"
                  style={{ borderRadius: "15px", border: "1px solid gray" }}
                >
                  <GoClock className="mt-1 mr-1" />
                  {subActivity.totalHoras}
                </div>
                <div
                  className="flex px-2 py-1 hidden md:flex"
                  style={{ borderRadius: "15px", border: "1px solid gray" }}
                >
                  <GiProgression className="mt-1 mr-1" />
                  {`${Number(subActivity?.porcentajeCompletado).toFixed(0)}%`}
                </div>
              </div>
              {rol ? (
                <>
                  <div className="flex md:hidden">
                    <PopOverViewInfo
                      OpenView={OpenView}
                      setOpenView={setOpenView}
                      rol={rol}
                      content={
                        <div className="block sm:flex ml-1">
                          <div
                            className="flex px-2 py-1"
                            style={{
                              borderRadius: "15px",
                              border: "1px solid gray",
                            }}
                          >
                            <FaRegCalendar className="mt-1 mr-1 " />
                            <span className="xl:hidden">
                              {formattedfechFin}
                            </span>
                            <span className="hidden xl:inline">
                              {formattedfechaInicio} - {formattedfechFin}
                            </span>
                          </div>
                          <div
                            className="flex px-2 py-1"
                            style={{
                              borderRadius: "15px",
                              border: "1px solid gray",
                            }}
                          >
                            <GoClock className="mt-1 mr-1" />
                            {totalHoras}
                          </div>
                          <div
                            className="flex px-2 py-1"
                            style={{
                              borderRadius: "15px",
                              border: "1px solid gray",
                            }}
                          >
                            <GiProgression className="mt-1 mr-1" />
                            {`${porcentajeCompletado.toFixed(0)}%`}
                          </div>
                        </div>
                      }
                    />
                    <button
                      onClick={togglePopover}
                      className=" md:hidden cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out"
                    >
                      {OpenView ? (
                        <RiEyeCloseFill
                          style={{ width: "20px", height: "20px" }}
                        />
                      ) : (
                        <BiShowAlt style={{ width: "20px", height: "20px" }} />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className=" cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out
              rounded ml-1"
                    style={{
                      color: !isEditing ? "rgb(29,210,0)" : "white",
                      backgroundColor: !isEditing ? "white" : "red",
                    }}
                  >
                    {!isEditing ? (
                      <MdEdit style={{ width: 25, height: 25 }} />
                    ) : (
                      <VscChromeClose style={{ width: 20, height: 20 }} />
                    )}
                  </button>
                  {informeP ? (
                    <></>
                  ) : (
                    <button
                      onClick={() => deleteSubActivity(subActivity?.id)}
                      className=" cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out"
                    >
                      <MdDelete
                        style={{ color: "red", width: 25, height: 25 }}
                      />
                    </button>
                  )}
                </>
              ) : (
                <div className="flex md:hidden">
                  <PopOverViewInfo
                    OpenView={OpenView}
                    setOpenView={setOpenView}
                    rol={rol}
                    content={
                      <div className="block sm:flex ml-1">
                        <div
                          className="flex px-2 py-1"
                          style={{
                            borderRadius: "15px",
                            border: "1px solid gray",
                          }}
                        >
                          <FaRegCalendar className="mt-1 mr-1 " />
                          <span className="xl:hidden">{formattedfechFin}</span>
                          <span className="hidden xl:inline">
                            {formattedfechaInicio} - {formattedfechFin}
                          </span>
                        </div>
                        <div
                          className="flex px-2 py-1"
                          style={{
                            borderRadius: "15px",
                            border: "1px solid gray",
                          }}
                        >
                          <GoClock className="mt-1 mr-1" />
                          {totalHoras}
                        </div>
                        <div
                          className="flex px-2 py-1"
                          style={{
                            borderRadius: "15px",
                            border: "1px solid gray",
                          }}
                        >
                          <GiProgression className="mt-1 mr-1" />
                          {`${porcentajeCompletado.toFixed(0)}%`}
                        </div>
                      </div>
                    }
                  />
                  <button
                    onClick={togglePopover}
                    className=" md:hidden cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out"
                  >
                    {OpenView ? (
                      <RiEyeCloseFill
                        style={{ width: "20px", height: "20px" }}
                      />
                    ) : (
                      <BiShowAlt style={{ width: "20px", height: "20px" }} />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="mt-3">
            <span>{subActivity.descripcion}</span>
          </div>
        </div>
      )}
    </div>
  );
};
