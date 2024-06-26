import { useState } from "react"


interface Decano { 
  nombre: string,
  documento: string

}

interface Props{
  decano: Decano

}

export const DecanoSettingsComponent = ({decano}:Props) => {
  const [editar, setEditar] = useState({ nombre: false , documento: false})

  return(
    <div className="space-y-2">
      {
        editar.nombre ? (
          <div className="flex space-x-2">
            <input
              type="text"
              defaultValue={decano.nombre}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              placeholder="Nombre del decano"
            />
            <button
              onClick={() => setEditar({ ...editar,nombre: false })}
              className="text-white bg-green-500 hover:bg-green-700 px-2 rounded-md">
              Guardar
            </button>
            <button
              onClick={() => setEditar({ ...editar, nombre: false })}
              className="text-white bg-red-500 hover:bg-red-700 px-2 rounded-md">
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-gray-900">{decano.nombre}</span>
            <button
              onClick={() => setEditar({...editar, nombre: true })}
              className="text-indigo-600 hover:text-indigo-900">
              Editar
            </button>
          </div>
        )
      }

      {
        editar.documento ? (
          <div className="flex space-x-2 sp">
            <input
              type="number"
              min={0}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              placeholder="Documento de identidad"
            />
            <button
              onClick={() => setEditar({ ...editar, documento: false })}
              className="text-white bg-green-500 hover:bg-green-700 px-2 rounded-md">
              Guardar
            </button>
            <button
              onClick={() => setEditar({ ...editar, documento: false })}
              className="text-white bg-red-500 hover:bg-red-700 px-2 rounded-md">
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex justify-between">
              <span className="text-gray-900">{ decano.documento || "Documento aún sin registrar."} </span>
            <button
              onClick={() => setEditar({ ...editar, documento: true })}
              className="text-indigo-600 hover:text-indigo-900">
              Editar
            </button>
          </div>
        )
      }
    </div>
  )
}