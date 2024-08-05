import React, { useEffect, useState } from "react";
import { MdCleaningServices } from "react-icons/md";
import { TfiSave } from "react-icons/tfi";
import Swal from "sweetalert2";
import { IntensidadHoraria } from "../../interfaces";
import useIntensidad from "../../hooks/useIntensidadHoraria";

interface Intensidad {
  rol: boolean;
  intensidadHoras?: IntensidadHoraria;
}
const IntensidadHorariaTable: React.FC<Intensidad> = ({
  rol,
  intensidadHoras,
}) => {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hours = [
    "8 a 9",
    "9 a 10",
    "10 a 11",
    "11 a 12",
    "1 a 2",
    "2 a 3",
    "3 a 4",
    "4 a 5",
  ];
  const { createIntensidad, updateIntensidad } = useIntensidad();

  const initialHours =
    intensidadHoras?.horario ||
    Array(hours.length)
      .fill(null)
      .map(() => Array(days.length).fill(false));
  const [selectedHours, setSelectedHours] = useState<boolean[][]>(initialHours);
  const [weeks, setWeeks] = useState<number>(1);
  useEffect(() => {
    if (intensidadHoras) {
      // Actualizar selectedHours si intensidadHoras.horario está definido
      if (intensidadHoras.horario) {
        setSelectedHours(intensidadHoras.horario);
      }

      // Actualizar weeks si intensidadHoras.cantidadSemanas está definido
      if (intensidadHoras.cantidadSemanas != null) {
        setWeeks(intensidadHoras.cantidadSemanas);
      }
    }
  }, [intensidadHoras]);

  const toggleHour = (hourIndex: number, dayIndex: number) => {
    const newSelectedHours = [...selectedHours];
    newSelectedHours[hourIndex][dayIndex] =
      !newSelectedHours[hourIndex][dayIndex];
    setSelectedHours(newSelectedHours);
  };

  const handleWeeksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setWeeks(value > 0 ? value : 0);
  };
  const handleSave = () => {
    if (intensidadHoras?.id != null) {
      const intensidad: IntensidadHoraria = {
        id: intensidadHoras?.id,
        horario: selectedHours,
        cantidadSemanas: Number(weeks),
      };
      updateIntensidad(intensidad).then((response) => {
        if (response === "ok") {
          Swal.fire({
            title: "Información guardada",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            title: "Ha ocurrido un error",
            text: "No se guardo la Información",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      });
    } else {
      const intensidad: IntensidadHoraria = {
        horario: selectedHours,
        cantidadSemanas: Number(weeks),
      };
      createIntensidad(intensidad).then((response) => {
        if (response === "ok") {
          Swal.fire({
            title: "Información guardada",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else {
          Swal.fire({
            title: "Ha ocurrido un error",
            text: "No se guardo la Información",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      });
    }
  };

  const totalSelectedHours = selectedHours.flat().filter(Boolean).length;
  const totalHoursPerWeek = totalSelectedHours * weeks;

  const resetTable = () => {
    setSelectedHours(
      Array(hours.length)
        .fill(null)
        .map(() => Array(days.length).fill(false))
    );
  };

  return (
    <div className="w-full p-4">
      <div className="w-full flex flex-col mb-7 md:flex-row">
        <div
          className="w-full flex justify-start mb-3 md:mb-0 md:mr-4"
          style={{ alignItems: "center" }}
        >
          <label className="block mr-2">Cantidad de semanas:</label>
          <input
            type="number"
            disabled={!rol}
            step="0.1"
            value={weeks}
            onChange={handleWeeksChange}
            className="border border-gray-400 p-2 rounded-lg w-20"
          />
        </div>
        {rol && (
          <div
            className="w-full flex justify-start md:w-auto md:justify-end"
            style={{ alignItems: "center" }}
          >
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded-lg mr-2 flex
             cursor-pointer 
             hover:scale-105 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out"
              onClick={handleSave}
              disabled={!rol}
            >
              <TfiSave className="mt-1 mr-1" />
              Guardar
            </button>
            <button
              onClick={resetTable}
              className="bg-red-500 text-white px-3 py-2 rounded-lg flex
             cursor-pointer 
             hover:scale-105 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out"
              disabled={!rol}
            >
              <MdCleaningServices className="mt-1 mr-1" />
              Limpiar
            </button>
          </div>
        )}
      </div>
      <div className="overflow-auto min-w-750px min-h-750px max-w-full p-4 bg-white">
        <table className="table-auto border-collapse border border-gray-400 w-full rounded-lg">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 w-1/7 rounded-tl-lg">
                Horario
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="border border-gray-300 px-4 py-2 w-1/6"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.slice(0, 4).map((hour, hourIndex) => (
              <tr key={hour}>
                <td className="border border-gray-300 px-4 py-2 w-1/7">
                  {hour}
                </td>
                {days.map((_, dayIndex) => (
                  <td
                    key={`${hourIndex}-${dayIndex}`}
                    className={`border border-gray-300 px-4 py-2 w-1/6 text-center ${
                      selectedHours[hourIndex][dayIndex] ? "bg-blue-300" : ""
                    }`}
                    style={{ cursor: rol ? "pointer" : "unset" }}
                    onClick={
                      !rol ? () => ({}) : () => toggleHour(hourIndex, dayIndex)
                    }
                  >
                    {selectedHours[hourIndex][dayIndex] ? "X" : ""}
                  </td>
                ))}
              </tr>
            ))}

            {/* Empty row with different color */}
            <tr className="bg-gray-200">
              <td
                className="border border-gray-300 px-4 py-2 w-1/7"
                colSpan={days.length + 1}
              ></td>
            </tr>

            {hours.slice(4).map((hour, hourIndex) => (
              <tr key={hour}>
                <td className="border border-gray-300 px-4 py-2 w-1/7">
                  {hour}
                </td>
                {days.map((_, dayIndex) => (
                  <td
                    key={`${hourIndex + 4}-${dayIndex}`}
                    className={`border border-gray-300 px-4 py-2 w-1/6 text-center ${
                      selectedHours[hourIndex + 4][dayIndex]
                        ? "bg-blue-300"
                        : ""
                    }`}
                    style={{ cursor: rol ? "pointer" : "unset" }}
                    onClick={
                      !rol
                        ? () => ({})
                        : () => toggleHour(hourIndex + 4, dayIndex)
                    }
                  >
                    {selectedHours[hourIndex + 4][dayIndex] ? "X" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <span className="block text-lg">
          Total de horas de Practicas: {totalHoursPerWeek}
        </span>
      </div>
    </div>
  );
};

export default IntensidadHorariaTable;
