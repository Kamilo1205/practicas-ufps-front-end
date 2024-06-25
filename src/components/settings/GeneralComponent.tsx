import { useState } from "react"

//TODO: Ajustar nombre
export const GeneralComponent = () => { 
  const [editar, setEditar] = useState([{ editar: false }])
  const decano = 'Jairo Andres Quintero Rodriguez'
  return (<>
    <div className="px-10">
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-base font-medium leading-6 text-gray-900">Decano</dt>
            <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {
                editar[0].editar ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      defaultValue={decano}
                      className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                      placeholder="Nombre del decano"
                    />
                    <button
                      onClick={() => setEditar([{ editar: false }])}
                      className="text-white bg-green-500 hover:bg-green-700 px-2 rounded-md">
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditar([{ editar: false }])}
                      className="text-white bg-red-500 hover:bg-red-700 px-2 rounded-md">
                      Cancelar
                    </button>
                  </div>
                ) : (
                    <div className="flex justify-between">
                      <span className="text-gray-900">{ decano}</span>
                      <button
                        onClick={() => setEditar([{ editar: true }])}
                        className="text-indigo-600 hover:text-indigo-900">
                        Editar
                      </button>
                  </div>
                )
              }
            </dd>
          </div>
          </dl>
        
      </div>
    </div>
  </>)
}