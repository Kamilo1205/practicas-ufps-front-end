// src/components/SubActivityForm.tsx
import React, { useState } from "react";
import { SubActivity as SubActivityType } from "../types";
import { IoMdAdd } from "react-icons/io";
import { Label } from "../../ui";
import NumberSlider from "../../ui/Input/NumberSlider";
import { SubActividad } from "../../../interfaces";

interface SubActivityFormProps {
  addSubActivity: (subActivity: SubActividad) => void;
}

export const SubActivityForm: React.FC<SubActivityFormProps> = ({
  addSubActivity,
}) => {
  const [titulo, settitulo] = useState("");
  const [descripcion, setdescripcion] = useState("");
  const [fechaInicio, setfechaInicio] = useState("");
  const [fechFin, setfechFin] = useState("");
  const [totalHoras, settotalHoras] = useState(0);
  const [porcentajeCompletado, setporcentajeCompletado] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSubActivity: SubActivityType = {
      titulo,
      descripcion,
      fechaInicio,
      fechFin,
      totalHoras: String(totalHoras),
      porcentajeCompletado: String(porcentajeCompletado),
    };
    addSubActivity(newSubActivity);
    settitulo("");
    setdescripcion("");
    setfechaInicio("");
    setfechFin("");
    settotalHoras(0);
    setporcentajeCompletado(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-12 gap-2 p-4 rounded-lg"
    >
      <div className="col-span-1 lg:col-span-6 flex flex-col">
        <Label>Título de Subactividad</Label>
        <input
          id="titulo"
          type="text"
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
            value={totalHoras}
            onChange={(e) => settotalHoras(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div>
          <NumberSlider
            progreso={porcentajeCompletado}
            setProgreso={setporcentajeCompletado}
          />
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
