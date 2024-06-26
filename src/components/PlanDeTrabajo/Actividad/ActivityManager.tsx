// src/components/ActivityManager.tsx
import React, { useState } from "react";
import { ActivityForm } from "./ActivityForm";
import { Activity } from "./Activity";
import { Activity as ActivityType } from "../types";
import { MdLibraryAddCheck } from "react-icons/md";
import { VscChromeClose } from "react-icons/vsc";
import { BsEmojiAstonished } from "react-icons/bs";

const initialActivities: ActivityType[] = [];
interface ActivityProps {
  rol: boolean;
  estudiante: {};
}
export const ActivityManager: React.FC<ActivityProps> = ({ rol }) => {
  const [activities, setActivities] =
    useState<ActivityType[]>(initialActivities);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const addActivity = (
    title: string,
    description: string,
    startDate: string,
    endDate: string
  ) => {
    const newActivity: ActivityType = {
      id: Date.now(),
      title,
      description,
      startDate,
      endDate,
      totalHours: 0,
      percentageComplete: 0,
      subActivities: [],
    };
    setActivities([...activities, newActivity]);
    setIsFormVisible(false); // Ocultar el formulario después de agregar una actividad
  };

  const updateActivity = (updatedActivity: ActivityType) => {
    const newActivities = activities.map((activity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity
    );
    setActivities(newActivities);
  };

  const deleteActivity = (id: number) => {
    const newActivities = activities.filter((activity) => activity.id !== id);
    setActivities(newActivities);
  };

  return (
    <div className="p-4">
      <div className="p-0 flex w-full" style={{ alignItems: "center" }}>
        <h1 className="text-2xl mb-4 font-bold text-gray-700 w-full">
          Gestión de Actividades
        </h1>
        {rol && (
          <div className="flex justify-end mt-1 ">
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="flex justify-end text-white px-2 py-2 mb-4"
              style={{
                backgroundColor: isFormVisible ? "Red" : "rgb(59 ,130 ,246)",
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
      </div>

      {isFormVisible && <ActivityForm addActivity={addActivity} />}
      <div className="space-y-4">
        {activities.map((activity) => (
          <Activity
            key={activity.id}
            activity={activity}
            updateActivity={updateActivity}
            deleteActivity={deleteActivity}
            rol={rol}
          />
        ))}
        {activities.length === 0 && !isFormVisible && (
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
