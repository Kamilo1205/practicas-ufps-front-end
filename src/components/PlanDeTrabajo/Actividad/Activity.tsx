// src/components/Activity.tsx
import React, { useState, useEffect } from "react";
import { SubActivity } from "./SubActivity";
import { SubActivityForm } from "./SubActivityForm";
import {
  Activity as ActivityType,
  SubActivity as SubActivityType,
} from "../types";
import { MdExpandMore, MdExpandLess, MdEdit, MdDelete } from "react-icons/md";
import { GoClock } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { FaCircleInfo, FaRegCalendar } from "react-icons/fa6";

import { TfiSave } from "react-icons/tfi";
import { IoIosAdd } from "react-icons/io";
import { VscChromeClose } from "react-icons/vsc";
import { Label, TextArea } from "../../ui";
import NumberSlider from "../../ui/Input/NumberSlider";
import { RiEyeCloseFill } from "react-icons/ri";
import { BiShowAlt } from "react-icons/bi";
import PopOverViewInfo from "./../../ui/Dialog/PopOverViewInfo";

interface ActivityProps {
  activity: ActivityType;
  updateActivity: (activity: ActivityType) => void;
  deleteActivity: (id: number) => void;
  rol: boolean;
  informeP?: boolean;
}

export const Activity: React.FC<ActivityProps> = ({
  activity,
  updateActivity,
  deleteActivity,
  rol,
  informeP = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [totalHours, setTotalHours] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubFormVisible, setIsSubFormVisible] = useState(false);
  const [title, setTitle] = useState(activity.title);
  const [startDate, setStartDate] = useState(activity.startDate);
  const [endDate, setEndDate] = useState(activity.endDate);
  const [description, setDescription] = useState(activity.description);
  const [OpenView, setOpenView] = useState(false);
  const [OpenInfo, setOpenInfo] = useState(false);
  const InicioDate = new Date(activity.startDate);

  const FinDate = new Date(activity.endDate);

  const InicioDateAdjusted = new Date(InicioDate.getTime());
  InicioDateAdjusted.setDate(InicioDateAdjusted.getDate() + 1);
  console.log(activity.description);
  console.log(description);
  const FinDateAdjusted = new Date(FinDate.getTime());
  FinDateAdjusted.setDate(FinDateAdjusted.getDate() + 1);

  // Formatear las fechas ajustadas
  const formattedStartDate = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    day: "numeric",
  }).format(InicioDateAdjusted);

  const formattedEndDate = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    day: "numeric",
  }).format(FinDateAdjusted);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const toggleOpenEdit = () => {
    if (isExpanded === true) {
      setIsExpanded(!isExpanded);
    } else {
      setIsExpanded(isExpanded);
    }
    setIsEditing(!isEditing);
  };

  const addSubActivity = (subActivity: SubActivityType) => {
    const updatedActivity = {
      ...activity,
      subActivities: [...activity.subActivities, subActivity],
    };
    updateActivity(updatedActivity);
    setIsSubFormVisible(false); // Ocultar el formulario después de agregar una subactividad
  };

  const updateSubActivity = (updatedSubActivity: SubActivityType) => {
    const updatedSubActivities = activity.subActivities.map((subActivity) =>
      subActivity.id === updatedSubActivity.id
        ? updatedSubActivity
        : subActivity
    );
    const updatedActivity = {
      ...activity,
      subActivities: updatedSubActivities,
    };
    updateActivity(updatedActivity);
  };

  const deleteSubActivity = (id: number) => {
    const updatedSubActivities = activity.subActivities.filter(
      (subActivity) => subActivity.id !== id
    );
    const updatedActivity = {
      ...activity,
      subActivities: updatedSubActivities,
    };
    updateActivity(updatedActivity);
  };

  const handleEdit = () => {
    const updatedActivity = {
      ...activity,
      title,
      startDate,
      endDate,
    };
    updateActivity(updatedActivity);
    setIsEditing(false);
  };

  const togglePopover = () => {
    setOpenView(!OpenView);
  };
  useEffect(() => {
    const hours = activity.subActivities.reduce(
      (acc, sub) => acc + sub.hours,
      0
    );
    const progress = activity.subActivities.length
      ? activity.subActivities.reduce((acc, sub) => acc + sub.progress, 0) /
        activity.subActivities.length
      : 0;
    setTotalHours(hours);
    setPercentageComplete(progress);
  }, [activity.subActivities]);
  return (
    <div className="border-b mb-2">
      <div className="flex justify-between items-center py-2">
        <div className="flex-1 items-center space-x-2 w-full mr-4 ">
          <button className="cursor-pointer" onClick={toggleExpand}>
            <>{isExpanded ? <MdExpandLess /> : <MdExpandMore />}</>
          </button>

          {isEditing ? (
            <div className="w-full flex-1">
              <Label>Título</Label>
              <textarea
                value={title}
                style={{
                  border: "1px solid rgb(209 213 219 )",
                  borderRadius: "0.375rem", // Equivale a rounded
                  padding: "0.30rem 0.5rem", // Equivale a px-2 py-1
                }}
                onChange={(e) => setTitle(e.target.value)}
                className="px-2 py-1 w-full"
                disabled={informeP}
              />
            </div>
          ) : (
            <span
              onClick={toggleExpand}
              className="w-full cursor-pointer"
              style={{ fontWeight: "bold" }}
            >
              {activity.title}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex">
            <div
              className="flex px-2 py-1"
              style={{ borderRadius: "15px", border: "1px solid gray" }}
            >
              <FaRegCalendar className="mt-1 mr-1 " />
              <span className="xl:hidden">{formattedEndDate}</span>
              <span className="hidden xl:inline">
                {formattedStartDate} - {formattedEndDate}
              </span>
            </div>
            <div
              className="flex px-2 py-1"
              style={{ borderRadius: "15px", border: "1px solid gray" }}
            >
              <GoClock className="mt-1 mr-1" />
              {totalHours}
            </div>
            <div
              className="flex px-2 py-1"
              style={{ borderRadius: "15px", border: "1px solid gray" }}
            >
              <GiProgression className="mt-1 mr-1" />
              {`${percentageComplete.toFixed(0)}%`}
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
                    <div className="inline sm:flex justify-center">
                      <div
                        className="flex px-2 py-1"
                        style={{
                          borderRadius: "15px",
                          border: "1px solid gray",
                        }}
                      >
                        <FaRegCalendar className="mt-1 mr-1" />
                        <span className="xl:hidden">{formattedEndDate}</span>
                        <span className="hidden xl:inline">
                          {formattedStartDate} - {formattedEndDate}
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
                        {totalHours}
                      </div>
                      <div
                        className="flex px-2 py-1"
                        style={{
                          borderRadius: "15px",
                          border: "1px solid gray",
                        }}
                      >
                        <GiProgression className="mt-1 mr-1" />
                        {`${percentageComplete.toFixed(0)}%`}
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
                    <RiEyeCloseFill style={{ width: "20px", height: "20px" }} />
                  ) : (
                    <BiShowAlt style={{ width: "20px", height: "20px" }} />
                  )}
                </button>
              </div>
              {informeP && activity.subActivities.length !== 0 ? (
                <></>
              ) : (
                <button
                  onClick={toggleOpenEdit}
                  className=" cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out
              rounded"
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
              )}

              {informeP ? (
                <></>
              ) : (
                <button
                  onClick={() => deleteActivity(activity.id)}
                  className=" cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out"
                >
                  <MdDelete style={{ color: "red", width: 25, height: 25 }} />
                </button>
              )}
            </>
          ) : (
            <>
              <div className="flex md:hidden">
                <PopOverViewInfo
                  OpenView={OpenView}
                  setOpenView={setOpenView}
                  rol={rol}
                  content={
                    <div className="inline sm:flex justify-center">
                      <div
                        className="flex px-2 py-1"
                        style={{
                          borderRadius: "15px",
                          border: "1px solid gray",
                        }}
                      >
                        <FaRegCalendar className="mt-1 mr-1" />
                        <span className="xl:hidden">{formattedEndDate}</span>
                        <span className="hidden xl:inline">
                          {formattedStartDate} - {formattedEndDate}
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
                        {totalHours}
                      </div>
                      <div
                        className="flex px-2 py-1"
                        style={{
                          borderRadius: "15px",
                          border: "1px solid gray",
                        }}
                      >
                        <GiProgression className="mt-1 mr-1" />
                        {`${percentageComplete.toFixed(0)}%`}
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
                    <RiEyeCloseFill style={{ width: "20px", height: "20px" }} />
                  ) : (
                    <BiShowAlt style={{ width: "20px", height: "20px" }} />
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="w-full">
          {activity.subActivities.length === 0 ? (
            <div className="w-full pl-6">
              <Label>Descripción</Label>
              <TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={informeP}
              />
            </div>
          ) : (
            <></>
          )}
          <div className="pl-6 mb-2 flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-auto mb-2 md:mb-0 md:mr-4">
              <Label>Inicio</Label>
              <input
                type="date"
                value={startDate}
                style={{
                  border: "1px solid rgb(209 213 219)",
                  borderRadius: "0.375rem",
                  padding: "0.30rem 0.5rem",
                }}
                onChange={(e) => setStartDate(e.target.value)}
                className="border rounded px-2 py-1 w-full md:w-auto"
                disabled={informeP}
              />
            </div>
            <div className="w-full md:w-auto mb-2 md:mb-0 md:mr-4">
              <Label>Fin</Label>
              <input
                type="date"
                min={startDate}
                value={endDate}
                style={{
                  border: "1px solid rgb(209 213 219)",
                  borderRadius: "0.375rem",
                  padding: "0.30rem 0.5rem",
                }}
                onChange={(e) => setEndDate(e.target.value)}
                className="border rounded px-2 py-1 w-full md:w-auto"
                disabled={informeP}
              />
            </div>
            {activity.subActivities.length !== 0 ? (
              <></>
            ) : (
              <div className="w-full flex flex-col md:flex-row mb-2 md:mb-0 md:mr-4">
                <div className="mb-2 md:mb-0 md:mr-2">
                  <Label>Horas</Label>
                  <input
                    id="hours"
                    type="number"
                    placeholder="Horas"
                    value={totalHours}
                    min={0}
                    style={{
                      border: "1px solid rgb(209 213 219)",
                      borderRadius: "0.375rem",
                      padding: "0.30rem 0.5rem",
                    }}
                    onChange={(e) => setTotalHours(Number(e.target.value))}
                    className="border rounded py-1 w-full"
                    required
                    disabled={informeP}
                  />
                </div>
                <div className="w-full md:w-auto">
                  <NumberSlider
                    progreso={percentageComplete}
                    setProgreso={setPercentageComplete}
                  />
                </div>
              </div>
            )}
            <div className="w-full md:w-auto">
              <button
                onClick={handleEdit}
                className="w-full bg-blue-500 text-white rounded px-2 py-1 flex
      cursor-pointer
      hover:scale-105
      active:scale-95
      transition-transform
      duration-150
      ease-in-out
      mt-6"
                style={{ justifyContent: "center" }}
              >
                <TfiSave className="mt-1 mr-1" />
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
      {isExpanded && (
        <div className="pl-6">
          {activity.subActivities.length === 0 ? (
            <div className="w-full mb-5">{description}</div>
          ) : (
            <></>
          )}
          {activity.subActivities.map((subActivity) => (
            <SubActivity
              key={subActivity.id}
              subActivity={subActivity}
              updateSubActivity={updateSubActivity}
              deleteSubActivity={deleteSubActivity}
              rol={rol}
              informeP={informeP}
            />
          ))}
          {informeP ? (
            <div className="mb-3">
              <button
                style={{
                  background: !OpenInfo ? "rgb(0,44,81)" : "red",
                  borderRadius: "7px",
                }}
                className=" px-2 py-2 mb-2 flex
              cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out
              text-white
              "
                onClick={() => setOpenInfo(!OpenInfo)}
              >
                {OpenInfo ? (
                  <>
                    <VscChromeClose className="mt-1" />
                  </>
                ) : (
                  <>
                    <FaCircleInfo className="flexmt-0 sm:mt-1 sm:mr-1 mr-0" />
                    <p className="hidden sm:block">Informe de Actividades</p>
                  </>
                )}
              </button>
            </div>
          ) : (
            <>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                }}
              >
                <div className="w-full flex mt-2">
                  <div className="flex w-full justify-start">
                    <button
                      style={{
                        background: !OpenInfo ? "rgb(0,44,81)" : "red",
                        borderRadius: "7px",
                      }}
                      className=" px-2 py-2 mb-2 flex
              cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out
              text-white
              "
                      onClick={() => setOpenInfo(!OpenInfo)}
                    >
                      {OpenInfo ? (
                        <>
                          <VscChromeClose className="mt-1" />
                        </>
                      ) : (
                        <>
                          <FaCircleInfo className="flexmt-0 sm:mt-1 sm:mr-1 mr-0" />
                          <p className="hidden sm:block">
                            Informe de Actividades
                          </p>
                        </>
                      )}
                    </button>
                  </div>
                  {rol && (
                    <div className="flex w-full justify-end">
                      <button
                        onClick={() => setIsSubFormVisible(!isSubFormVisible)}
                        className=" px-2 py-2 mb-2 flex
              cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out"
                        style={{
                          color: !isSubFormVisible ? "#008BFF" : "white",
                          backgroundColor: !isSubFormVisible
                            ? "rgb(188,224,255)"
                            : "red",
                          borderRadius: "7px",
                        }}
                      >
                        {isSubFormVisible ? (
                          <>
                            <VscChromeClose className="mt-1" />
                          </>
                        ) : (
                          <>
                            <IoIosAdd className="flexmt-0 sm:mt-1 sm:mr-1 mr-0" />
                            <p className="hidden sm:block">
                              Añadir SubActividad
                            </p>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {isSubFormVisible && (
                <div className="border rounded mb-5">
                  <SubActivityForm addSubActivity={addSubActivity} />
                </div>
              )}
            </>
          )}
          {OpenInfo ? (
            <div className="mb-2 mt-2 rounded border border-gray-300">
              <div className="p-3 overflow-auto min-w-750px min-h-750px max-w-full">
                <div
                  className="w-full flex justify-center mb-2"
                  style={{ fontWeight: "bold" }}
                >
                  Informe de Actividades
                </div>
                <table className="table-auto border-collapse border border-gray-400 w-full rounded-lg">
                  {!rol ? (
                    <>
                      <tr className="w-full">
                        <th className="border border-gray-300 p-2">
                          Estrategia de Desarrollo
                        </th>
                        <td className="border border-gray-300 p-2">
                          <TextArea
                            rows={3}
                            disabled={!rol}
                            style={{ minWidth: "150px" }}
                          ></TextArea>
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300 p-2">
                          Recursos Utilizados
                        </th>
                        <td className="border border-gray-300 p-2">
                          <TextArea rows={3} disabled={!rol}></TextArea>
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300 p-2">
                          Resultados Obtenidos
                        </th>
                        <td className="border border-gray-300 p-2">
                          <TextArea rows={3} disabled={!rol}></TextArea>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr className="w-full">
                        <th className="border border-gray-300 p-2">
                          Estrategia de Desarrollo
                        </th>
                        <td className="border border-gray-300 p-2">
                          <TextArea
                            rows={3}
                            disabled={informeP}
                            style={{ minWidth: "150px" }}
                          ></TextArea>
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300 p-2">
                          Recursos Utilizados
                        </th>
                        <td className="border border-gray-300 p-2">
                          <TextArea rows={3} disabled={informeP}></TextArea>
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300 p-2">
                          Resultados Obtenidos
                        </th>
                        <td className="border border-gray-300 p-2">
                          <TextArea rows={3} disabled={informeP}></TextArea>
                        </td>
                      </tr>
                    </>
                  )}

                  {informeP ? (
                    <>
                      <tr>
                        <th className="border border-gray-300 p-2 w-[30%]">
                          Impactos percibidos por el estudiante
                        </th>
                        <td className="border border-gray-300 p-2 w-[70%]">
                          <TextArea
                            rows={3}
                            disabled={!rol}
                            placeholder="Describa los aportes y beneficios, que la realización de la actividad o subactividad le aportó a usted a nivel personal, académico y laboral"
                          ></TextArea>
                        </td>
                      </tr>
                      <tr>
                        <th className="border border-gray-300 p-2 w-[30%]">
                          Limitaciones
                        </th>
                        <td className="border border-gray-300 p-2 w-[70%]">
                          <TextArea
                            rows={3}
                            disabled={!rol}
                            placeholder="Relacione las situaciones presentadas durante el desarrollo de la práctica que de un modo u otro retrasaron o limitaron el logro de los objetivos trazados inicialmente."
                          ></TextArea>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <></>
                  )}
                </table>
              </div>
              <div className="flex w-full justify-end px-4">
                {!rol ? (
                  <></>
                ) : (
                  <button
                    className="   cursor-pointer
              hover:scale-105
              active:scale-95
              transition-transform
              duration-150
              ease-in-out
              bg-blue-500
              text-white p-2 mb-2 rounded flex"
                  >
                    <TfiSave className="mt-1 mr-1" />
                    Guardar
                  </button>
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
};
