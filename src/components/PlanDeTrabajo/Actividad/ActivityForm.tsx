// src/components/ActivityForm.tsx
import React, { useState } from "react";

import { MdFileDownloadDone } from "react-icons/md";
import { Label } from "../../ui";

interface ActivityFormProps {
  addActivity: (
    titulo: string,
    descripcion: string,
    fechaInicio: string,
    fechaFin: string
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
    <form onSubmit={handleSubmit} className="flex flex-wrap w-full mb-4">
      <div className="w-full md:w-auto flex md:mr-1 mb-3 md:mb-0">
        <div className="w-full">
          <Label>Titulo</Label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              border: "1px solid rgb(209 213 219)",
              borderRadius: "0.375rem",
              padding: "0.30rem 0.5rem",
            }}
            className="px-2 py-1 w-full rounded md:w-auto"
          />
        </div>
      </div>
      <div className="w-full md:w-auto flex md:mx-1 mb-3 md:mb-0">
        <div className="w-full">
          <Label>Inicio</Label>
          <input
            type="date"
            className="px-2 py-1 w-full md:w-auto"
            style={{
              border: "1px solid rgb(209 213 219)",
              borderRadius: "0.375rem",
              padding: "0.30rem 0.5rem",
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="w-full md:w-auto flex md:ml-1">
        <div className="w-full">
          <Label>Fin</Label>
          <input
            min={startDate}
            type="date"
            className="px-2 py-1 w-full md:w-auto"
            style={{
              border: "1px solid rgb(209 213 219)",
              borderRadius: "0.375rem",
              padding: "0.30rem 0.5rem",
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
      </div>
      <div
        className="flex w-full md:ml-2 md:w-auto justify-end mt-3 md:mt-0"
        style={{ height: "78px", alignItems: "center" }}
      >
        <button
          type="submit"
          className="bg-green-500 text-white rounded px-4 py-3 "
        >
          <MdFileDownloadDone />
        </button>
      </div>
    </form>
  );
};
