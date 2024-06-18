// src/components/SubActivity.tsx
import React, { useState } from "react";
import { SubActivity as SubActivityType } from "../types";
import { MdEdit, MdDelete } from "react-icons/md";

interface SubActivityProps {
  subActivity: SubActivityType;
  updateSubActivity: (subActivity: SubActivityType) => void;
  deleteSubActivity: (id: number) => void;
}

export const SubActivity: React.FC<SubActivityProps> = ({
  subActivity,
  updateSubActivity,
  deleteSubActivity,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(subActivity.title);
  const [description, setDescription] = useState(subActivity.description);
  const [startDate, setStartDate] = useState(subActivity.startDate);
  const [endDate, setEndDate] = useState(subActivity.endDate);
  const [hours, setHours] = useState(subActivity.hours);
  const [progress, setProgress] = useState(subActivity.progress);

  const handleEdit = () => {
    const updatedSubActivity = {
      ...subActivity,
      title,
      description,
      startDate,
      endDate,
      hours,
      progress,
    };
    updateSubActivity(updatedSubActivity);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-between items-center py-2">
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <input
            type="date"
            value={startDate}
            style={{
              border: "1px solid rgb(209 213 219 )",
              borderRadius: "0.375rem", // Equivale a rounded
              padding: "0.30rem 0.5rem", // Equivale a px-2 py-1
            }}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-2 py-1"
          />
          <input
            type="date"
            value={endDate}
            style={{
              border: "1px solid rgb(209 213 219 )",
              borderRadius: "0.375rem", // Equivale a rounded
              padding: "0.30rem 0.5rem", // Equivale a px-2 py-1
            }}
            onChange={(e) => setEndDate(e.target.value)}
            className=" px-2 py-1"
          />
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="border rounded px-2 py-1"
          />
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white rounded px-2 py-1"
          >
            Guardar
          </button>
        </>
      ) : (
        <>
          <span>{subActivity.title}</span>
          <span>{subActivity.description}</span>
          <span>{`${subActivity.startDate} - ${subActivity.endDate}`}</span>
          <span>{`Horas: ${subActivity.hours}`}</span>
          <span>{`Progreso: ${subActivity.progress}%`}</span>
          <button onClick={() => setIsEditing(true)}>
            <MdEdit />
          </button>
          <button onClick={() => deleteSubActivity(subActivity.id)}>
            <MdDelete />
          </button>
        </>
      )}
    </div>
  );
};
