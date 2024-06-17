// src/components/ActivityForm.tsx
import React, { useState } from "react";

interface ActivityFormProps {
  addActivity: (
    title: string,
    description: string,
    startDate: string,
    endDate: string
  ) => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({ addActivity }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addActivity(title, description, startDate, endDate);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2 mb-4">
      <input
        type="text"
        placeholder="Título de la Actividad"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-2 py-1"
        required
      />
      <textarea
        placeholder="Descripción de la Actividad"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-2 py-1"
        required
      />
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
      <button
        type="submit"
        className="bg-green-500 text-white rounded px-4 py-2"
      >
        Añadir Actividad
      </button>
    </form>
  );
};
