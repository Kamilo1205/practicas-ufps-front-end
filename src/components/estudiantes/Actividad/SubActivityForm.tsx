// src/components/SubActivityForm.tsx
import React, { useState } from "react";
import { SubActivity as SubActivityType } from "../types";

interface SubActivityFormProps {
  addSubActivity: (subActivity: SubActivityType) => void;
}

export const SubActivityForm: React.FC<SubActivityFormProps> = ({
  addSubActivity,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hours, setHours] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubActivity: SubActivityType = {
      id: Date.now(),
      title,
      description,
      startDate,
      endDate,
      hours,
      progress,
    };
    addSubActivity(newSubActivity);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setHours(0);
    setProgress(0);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mb-4">
      <div className="flex">
        <div>
          <input
            type="text"
            placeholder="Título de la SubActividad"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-2 py-1"
            required
          />
        </div>
        <div>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-2 py-1"
            required
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-2 py-1"
            required
          />
        </div>
      </div>
      <div>
        <textarea
          placeholder="Descripción de la SubActividad"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-2 py-1"
          required
        />
      </div>
      <input
        type="number"
        placeholder="Horas"
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
        className="border rounded px-2 py-1"
        required
      />
      <input
        type="number"
        placeholder="Progreso (%)"
        value={progress}
        onChange={(e) => setProgress(Number(e.target.value))}
        className="border rounded px-2 py-1"
        required
      />
      <button
        type="submit"
        className="bg-green-500 text-white rounded px-4 py-2"
      >
        Añadir SubActividad
      </button>
    </form>
  );
};
