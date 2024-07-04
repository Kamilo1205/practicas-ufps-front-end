import { useState } from "react"
import { Solicitud, } from "../../schemas/solicitudSchema"
import { DialogComponent } from "../ui/Dialog/DialogComponent"
import { EstudiantePerfilComponent } from "../usuarios/perfil/EstudiantePerfilComponent"
import { Estudiante } from "../../interfaces/estudiante.interface"
import useEstudiantes from "../../hooks/useEstudiantes"
import { BiError } from "react-icons/bi"


const SolicitudPendiente = () => {
  return (
    <div className="flex">
      <span className="text-yellow-400 text-sm font-semibold self-center">Solicitud pendiente de asignación</span>

    </div>
  )
}

const SolicitudAsignada = () => {
  return (
    <div className="flex">
      <span className="text-green-400 text-sm font-semibold self-center">Solicitud asignada</span>

    </div>
  )

}

interface SolicitudComponentProps {
  solicitud: Solicitud | null

}

export const SolicitudComponent = ({ solicitud }: SolicitudComponentProps) => {

  //const [estudianteId, setEstudianteId] = useState<string>("")
  const [mostrarPerfil, setMostrarPerfil] = useState(false)
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null)
  const [solicitudSeleccionada,] = useState<Solicitud | null>(solicitud)
  //console.log('sol-select', solicitudSeleccionada)

  const { fetchEstudianteById } = useEstudiantes()

  const onEstudianteClick = (idEstudiante: string) => {
    setMostrarPerfil(true)
    fetchEstudianteById(idEstudiante).then((estudiante) => {
      console.log('aa', estudiante)
      setEstudianteSeleccionado(estudiante)

    })
  }

  return (<>
    <DialogComponent
      isOpen={mostrarPerfil}
      onClose={() => setMostrarPerfil(false)}
      content={
        estudianteSeleccionado ? <EstudiantePerfilComponent
          estudiante={estudianteSeleccionado}
        />
          :
          <div className="flex flex-col justify-center space-y-2">
            <div className="self-center">
              <BiError className="text-red-500 w-10 h-10" />
            </div>
            <span className="self-center">¡Ha ocurrido un error! No se pudo encontrar el estudiante seleccionado.</span>
          </div>
      }
      title=""
      size="2xl"
    />
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Solicitud de practicante</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Estado</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {
                solicitudSeleccionada?.cantidadPracticantes === solicitudSeleccionada?.asignaciones.length ? <SolicitudAsignada /> : <SolicitudPendiente />
              }

            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Número de practicantes</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {solicitudSeleccionada?.cantidadPracticantes}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Perfiles solicitados</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul>
                {
                  solicitudSeleccionada?.areasInteres.map((area) => (
                    <li key={area.id}>{area.nombre}</li>
                  ))
                }

              </ul>
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Herramientas solicitadas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul className="flex space-x-3">
                {
                  solicitudSeleccionada?.herramientas?.map((herramienta) => (
                    <li key={herramienta.id}>{herramienta.nombre}</li>
                  ))
                }
              </ul>
            </dd>
          </div>

          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Remuneración economica</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {solicitudSeleccionada?.esRenumerado ? 'Si' : 'No'}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Estudiantes asignados</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {
                solicitudSeleccionada?.asignaciones.length === 0 ? <span>No hay estudiantes asignados</span> :
                  solicitudSeleccionada?.asignaciones.map((asignacion) => (
                    <div key={asignacion.id}
                      onClick={() => onEstudianteClick(asignacion?.estudiante?.id)}
                      className="flex space-x-2 cursor-pointer text-blue-500">
                      <span>{asignacion?.estudiante?.codigo}</span>
                      <span>- {asignacion?.estudiante?.primerNombre}</span>
                    </div>
                  ))
              }
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </>)
}