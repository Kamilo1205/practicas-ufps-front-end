// src/components/ActivityManager.tsx
import React, { useEffect, useState } from "react";
import { ActivityForm } from "./ActivityForm";
import { Activity } from "./Activity";
import { MdLibraryAddCheck } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { BsEmojiAstonished } from "react-icons/bs";
import { Label } from "./../../ui/Label/Label";
import { Actividad } from "../../../interfaces";
import useActividad from "../../../hooks/useActividad";
import Swal from "sweetalert2";

interface ActivityProps {
  rol: boolean;
  estudiante: {};
  informeP?: boolean;
  actividades?: Actividad[];
}
export const ActivityManager: React.FC<ActivityProps> = ({
  rol,
  informeP = false,
  actividades,
}) => {
  const [activities, setActivities] = useState<Actividad[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addActivity = (
    titulo: string,
    descripcion: string,
    fechaInicio: string,
    fechFin: string
  ) => {
    const newActivity: Actividad = {
      titulo,
      descripcion,
      fechaInicio,
      fechFin,
      totalHoras: String(0),
      porcentajeCompletado: String(0),
      subActividades: [],
    };
    createActividad(newActivity).then((response) => {
      if (response.ok === "ok") {
        Swal.fire({
          title: "Información guardada",
          text: "Los datos han sido guardados correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setActivities([...activities, response.data]);
      } else {
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "No se guardo la Información",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });

    setIsFormVisible(false); // Ocultar el formulario después de agregar una actividad
  };

  const { createActividad, deleteActividad, updateActividad } = useActividad();

  const actualizarLista = (updatedActivity: Actividad) => {
    const newActivities = activities.map((activity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
    setActivities(newActivities);
  };
  const updateActivity = (updatedActivity: Actividad) => {
    updateActividad(updatedActivity?.id, updatedActivity).then((response) => {
      if (response === "ok") {
        Swal.fire({
          title: "Información guardada",
          text: "Los datos han sido guardados correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        actualizarLista(updatedActivity);
      } else {
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "No se guardo la Información",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  const deleteActivity = (id: string) => {
    const newActivities = activities.filter((activity) => activity.id !== id);
    deleteActividad(id).then((response) => {
      if (response === "ok") {
        Swal.fire({
          title: "Información guardada",
          text: "Los datos han sido guardados correctamente.",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setActivities(newActivities);
      } else {
        Swal.fire({
          title: "Ha ocurrido un error",
          text: "No se guardo la Información",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });
  };

  useEffect(() => {
    if (actividades != null) {
      setActivities(actividades);
    }
  }, [actividades]);
  return (
    <div className="p-4">
      <div className="p-0 flex w-full mb-6" style={{ alignItems: "center" }}>
        {informeP ? (
          <Label className="w-full">Actividades de Practicas</Label>
        ) : (
          <h1 className="text-2xl mb-4 font-bold text-gray-700 w-full">
            Gestión de Actividades
          </h1>
        )}
        {informeP ? (
          <></>
        ) : (
          <>
            {rol && (
              <div className="flex justify-end mt-1 ">
                <button
                  onClick={() => setIsFormVisible(!isFormVisible)}
                  className="flex justify-end text-white px-2 py-2 mb-4"
                  style={{
                    backgroundColor: isFormVisible
                      ? "Red"
                      : "rgb(59 ,130 ,246)",
                    borderRadius: "10px",
                  }}
                >
                  {isFormVisible ? (
                    <>
                      <VscChromeClose />
                    </>
                  ) : (
                    <>
                      <MdLibraryAddCheck
                        style={{ width: "25px", height: "25px" }}
                      />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {isFormVisible && <ActivityForm addActivity={addActivity} />}
      <div className="space-y-4">
        {activities.map((activity) => (
          <Activity
            key={Math.floor(Math.random() * 10000000000)}
            activity={activity}
            updateActivity={updateActivity}
            deleteActivity={deleteActivity}
            actualizarLista={actualizarLista}
            updateActivityReset={updateActivityReset}
            rol={rol}
            informeP={informeP}
          />
        ))}
        {activities != null && activities.length === 0 && !isFormVisible && (
          <div className="w-full mt-20 mb-20">
            <div className="flex " style={{ justifyContent: "center" }}>
              <BsEmojiAstonished style={{ width: "150px", height: "150px" }} />
            </div>
            <div className="flex mt-4" style={{ justifyContent: "center" }}>
              <p style={{ fontSize: "15pt" }}>
                No se han registrado actividades
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
