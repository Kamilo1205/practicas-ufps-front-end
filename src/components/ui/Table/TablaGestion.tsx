import React from "react";

interface TablaGestionProps {
  filas: string[];
  columnas: string[];
  selecciones: boolean[][];
  setSelecciones: React.Dispatch<React.SetStateAction<boolean[][]>>;
  editable: boolean;
  titulo: string;
}

const TablaGestion: React.FC<TablaGestionProps> = ({
  filas,
  columnas,
  selecciones,
  setSelecciones,
  editable,
  titulo,
}) => {
  const handleClick = (filaIndex: number, columnaIndex: number) => {
    if (!editable) return;
    const nuevasSelecciones = selecciones.map((fila, i) =>
      fila.map((seleccionado, j) =>
        i === filaIndex ? j === columnaIndex : seleccionado
      )
    );
    setSelecciones(nuevasSelecciones);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-400">
        <thead>
          <tr className="bg-slate-200">
            <th colSpan={6} className="justify-center w-full">
              {titulo}
            </th>
          </tr>
          <tr>
            <th className="border border-gray-400 px-4 py-2">
              Aspectos a evaluar
            </th>
            {columnas.map((columna, index) => (
              <th
                key={index}
                className="border border-gray-400 px-4 py-2 text-center"
              >
                {columna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, filaIndex) => (
            <tr key={filaIndex}>
              <td className="border border-gray-400 px-4 py-2">{fila}</td>
              {columnas.map((_, columnaIndex) => (
                <td
                  key={columnaIndex}
                  className={`border border-gray-400 px-4 py-2 text-center ${
                    editable ? "cursor-pointer hover:bg-blue-100" : ""
                  }`}
                  onClick={() => handleClick(filaIndex, columnaIndex)}
                >
                  {selecciones[filaIndex][columnaIndex] ? "X" : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaGestion;
