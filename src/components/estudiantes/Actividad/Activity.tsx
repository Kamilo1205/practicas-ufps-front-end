// src/components/Activity.tsx
import React, { useState, useEffect } from "react";
import { SubActivity } from "./SubActivity";
import { SubActivityForm } from "./SubActivityForm";
import {
  Activity as ActivityType,
  SubActivity as SubActivityType,
} from "../types";
import { MdExpandMore, MdExpandLess, MdEdit, MdDelete } from "react-icons/md";

interface ActivityProps {
  activity: ActivityType;
  updateActivity: (activity: ActivityType) => void;
  deleteActivity: (id: number) => void;
}

export const Activity: React.FC<ActivityProps> = ({
  activity,
  updateActivity,
  deleteActivity,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [totalHours, setTotalHours] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubFormVisible, setIsSubFormVisible] = useState(false);
  const [title, setTitle] = useState(activity.title);
  const [description, setDescription] = useState(activity.description);
  const [startDate, setStartDate] = useState(activity.startDate);
  const [endDate, setEndDate] = useState(activity.endDate);

  const toggleExpand = () => setIsExpanded(!isExpanded);

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
      description,
      startDate,
      endDate,
    };
    updateActivity(updatedActivity);
    setIsEditing(false);
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
        <div className="flex items-center space-x-2">
          <button onClick={toggleExpand}>
            {isExpanded ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded px-2 py-1"
            />
          ) : (
            <span>{activity.title}</span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span>{`${activity.startDate} - ${activity.endDate}`}</span>
          <span>{`Total Horas: ${totalHours}`}</span>
          <span>{`Progreso: ${percentageComplete.toFixed(2)}%`}</span>
          <button onClick={() => setIsEditing(true)}>
            <MdEdit />
          </button>
          <button onClick={() => deleteActivity(activity.id)}>
            <MdDelete />
          </button>
        </div>
      </div>
      {isEditing && (
        <div className="pl-6 space-y-2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white rounded px-2 py-1"
          >
            Guardar
          </button>
        </div>
      )}
      {isExpanded && (
        <div className="pl-6 space-y-2">
          {activity.subActivities.map((subActivity) => (
            <SubActivity
              key={subActivity.id}
              subActivity={subActivity}
              updateSubActivity={updateSubActivity}
              deleteSubActivity={deleteSubActivity}
            />
          ))}
          <button
            onClick={() => setIsSubFormVisible(!isSubFormVisible)}
            className="bg-blue-500 text-white rounded px-4 py-2 mb-2"
          >
            {isSubFormVisible ? "Cerrar Formulario" : "Añadir SubActividad"}
          </button>
          {isSubFormVisible && (
            <SubActivityForm addSubActivity={addSubActivity} />
          )}
        </div>
      )}
    </div>
  );
};