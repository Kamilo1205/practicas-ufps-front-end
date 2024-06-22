// src/components/SubActivityForm.tsx
import React, { useState } from "react";
import { SubActivity as SubActivityType } from "../types";
import { Label } from "../../ui";
import NumberSlider from "../../ui/Input/NumberSlider";
import { IoMdAdd } from "react-icons/io";

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
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-12 gap-2 p-4 rounded-lg"
    >
      <div className="col-span-1 lg:col-span-6 flex flex-col">
        <Label>Título de Subactividad</Label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      <div className="col-span-1 lg:col-span-3 flex flex-col">
        <Label>Inicio</Label>
        <input
          id="start-date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      <div className="col-span-1 lg:col-span-3 flex flex-col">
        <Label>Fin</Label>
        <input
          id="end-date"
          type="date"
          min={startDate}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>

      <div className="col-span-1 lg:col-span-9 flex flex-col">
        <Label>Descripción de la Subactividad</Label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded px-3 py-2 w-full resize-none"
          rows={6}
          required
        />
      </div>

      <div className="col-span-1 lg:col-span-3 flex flex-col">
        <div>
          <Label>Horas</Label>
          <input
            id="hours"
            min={0}
            type="number"
            placeholder="Horas"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <NumberSlider progreso={progress} setProgreso={setProgress} />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white rounded px-4 py-2 mt-4 hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 flex"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <IoMdAdd style={{ width: "18px", height: "18px" }} />
          Añadir SubActividad
        </button>
      </div>
    </form>
  );
};
