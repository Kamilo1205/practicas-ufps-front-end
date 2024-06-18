import React, { useState } from "react";
import { MdCleaningServices } from "react-icons/md";

const IntensidadHorariaTable: React.FC = () => {
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

  const [selectedHours, setSelectedHours] = useState<boolean[][]>(
    Array(hours.length)
      .fill(null)
      .map(() => Array(days.length).fill(false))
  );
  const [weeks, setWeeks] = useState<number>(1);

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
      <div className="w-full flex mb-7">
        <div className="w-full flex justify-start">
          <label className="block mt-2.5 mr-2">Cantidad de semanas:</label>
          <input
            type="number"
            step="0.1"
            value={weeks}
            onChange={handleWeeksChange}
            className="border border-gray-400 p-2 rounded-lg"
          />
        </div>
        <div className="ml-1 flex justify-end">
          <button
            onClick={resetTable}
            className="bg-red-500 text-white px-4 py-4 rounded-lg 
             cursor-pointer 
             hover:scale-105 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out"
          >
            <MdCleaningServices />
          </button>
        </div>
      </div>

      <table className="table-auto border-collapse border border-gray-400 w-full rounded-lg">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 w-1/7 rounded-tl-lg">
              Horario
            </th>
            {days.map((day) => (
              <th key={day} className="border border-gray-300 px-4 py-2 w-1/6">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.slice(0, 4).map((hour, hourIndex) => (
            <tr key={hour}>
              <td className="border border-gray-300 px-4 py-2 w-1/7">{hour}</td>
              {days.map((_, dayIndex) => (
                <td
                  key={`${hourIndex}-${dayIndex}`}
                  className={`border border-gray-300 px-4 py-2 w-1/6 cursor-pointer text-center ${
                    selectedHours[hourIndex][dayIndex] ? "bg-blue-300" : ""
                  }`}
                  onClick={() => toggleHour(hourIndex, dayIndex)}
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
              <td className="border border-gray-300 px-4 py-2 w-1/7">{hour}</td>
              {days.map((_, dayIndex) => (
                <td
                  key={`${hourIndex + 4}-${dayIndex}`}
                  className={`border border-gray-300 px-4 py-2 w-1/6 cursor-pointer text-center ${
                    selectedHours[hourIndex + 4][dayIndex] ? "bg-blue-300" : ""
                  }`}
                  onClick={() => toggleHour(hourIndex + 4, dayIndex)}
                >
                  {selectedHours[hourIndex + 4][dayIndex] ? "X" : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <span className="block text-lg">
          Total de horas de Practicas: {totalHoursPerWeek}
        </span>
      </div>
    </div>
  );
};

export default IntensidadHorariaTable;
