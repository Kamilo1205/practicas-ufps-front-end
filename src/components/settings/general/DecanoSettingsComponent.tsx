import { useEffect, useState } from "react"


interface Decano {
  nombre: string,
  numeroDocumento: string

}

interface Props {
  decano: Decano
  actualizarDecano: (decano: Decano) => void
}

export const DecanoSettingsComponent = ({ decano, actualizarDecano }: Props) => {
  const [editar, setEditar] = useState({ nombre: false, documento: false, codigo: false })
  const [formulario, setFormulario] = useState<Decano>(decano)


  console.log(formulario)

  useEffect(() => {
    if (!formulario?.id) {
      setFormulario(decano)
    }
  }, [decano])

  const onSubmmit = () => {
    console.log('formulario', formulario)
    actualizarDecano(formulario)
    setEditar({ nombre: false, documento: false })
  }
  const onCancelar = () => {
    setEditar({ nombre: false, documento: false })
    setFormulario(decano)
  }



  return (
    <div className="space-y-2">
      {
        editar.nombre ? (
          <div className="flex space-x-2">
            <input
              type="text"
              defaultValue={decano?.nombre}
              onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              placeholder="Nombre del decano"
            />
            <button
              onClick={() => onSubmmit()}
              className="text-white bg-green-500 hover:bg-green-700 px-2 rounded-md">
              Guardar
            </button>
            <button
              onClick={() => onCancelar()}
              className="text-white bg-red-500 hover:bg-red-700 px-2 rounded-md">
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-gray-900">{decano.nombre}</span>
            <button
              onClick={() => setEditar({ ...editar, nombre: true })}
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
              defaultValue={decano?.numeroDocumento}
              onChange={(e) => setFormulario({ ...formulario, numeroDocumento: e.target.value })}
              type="number"
              min={0}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              placeholder="Documento de identidad"
            />
            <button
              onClick={() => onSubmmit()}
              className="text-white bg-green-500 hover:bg-green-700 px-2 rounded-md">
              Guardar
            </button>
            <button
              onClick={() => onCancelar()}
              className="text-white bg-red-500 hover:bg-red-700 px-2 rounded-md">
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-gray-900">{`Documento: ${decano.numeroDocumento}` || "Documento aún sin registrar."} </span>
            <button
              onClick={() => setEditar({ ...editar, documento: true })}
              className="text-indigo-600 hover:text-indigo-900">
              Editar
            </button>
          </div>
        )
      }

      {
        editar.codigo ? (
          <div className="flex space-x-2 sp">
            <input
              defaultValue={decano?.numeroDocumento}
              onChange={(e) => setFormulario({ ...formulario, numeroDocumento: e.target.value })}
              type="number"
              min={0}
              className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
              placeholder="Documento de identidad"
            />
            <button
              onClick={() => onSubmmit()}
              className="text-white bg-green-500 hover:bg-green-700 px-2 rounded-md">
              Guardar
            </button>
            <button
              onClick={() => onCancelar()}
              className="text-white bg-red-500 hover:bg-red-700 px-2 rounded-md">
              Cancelar
            </button>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-gray-900">{`Código: ${decano.numeroDocumento}` || "Documento aún sin registrar."} </span>
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