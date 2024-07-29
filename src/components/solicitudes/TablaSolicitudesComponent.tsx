import { BiArrowToRight, BiCheckCircle } from "react-icons/bi"
import { Solicitud } from "../../schemas/solicitudSchema"
import { BsXLg } from "react-icons/bs"
import { MdCancel } from "react-icons/md"

interface TablaSolicitudesComponentProps {
  operable?: boolean
  solicitudes: Solicitud[]
  onMostrarSolicitud: (solicitud: Solicitud) => void
  onCancelarSolictud: (solicitudId: string) => void
}

export const TablaSolicitudesComponent = ({
  operable = false,
  solicitudes, onMostrarSolicitud, onCancelarSolictud }: TablaSolicitudesComponentProps) => {

  return (
    <div>


      <ul role="list" className="divide-y divide-gray-100">
        {
          solicitudes.map((solicitud) => (
            <li
              key={solicitud.id || 0}

              className="flex justify-between gap-x-6 py-5">
              <div
                onClick={() => onMostrarSolicitud(solicitud)}
                className="flex min-w-0 gap-x-4 cursor-pointer">
                {
                  solicitud?.asignaciones?.length === solicitud?.cantidadPracticantes ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-10 w-10 text-green-400">
                      <title>Solicitud aprobada</title>
                      <BiCheckCircle />
                    </svg>
                  ) :
                    (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                        className="h-8 w-8 text-yellow-400 self-center">
                        <title>Solicitud pendiente</title>
                        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
                      </svg>
                    )
                }

                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{`Solicitud de ${solicitud.cantidadPracticantes} ${solicitud.cantidadPracticantes > 0 ? 'practicantes' : 'practicante'}`}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-blue-500 flex content-center">
                    Ver solicitud
                    <BiArrowToRight className="self-center" />
                  </p>
                </div>
              </div>
              {
                operable && (
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <button
                      onClick={() => onCancelarSolictud(solicitud.id || '')}
                      className="self-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                        className="h-10 w-10 text-red-400 cursor-pointer">
                        <BsXLg />
                      </svg>
                    </button>
                  </div>
                )
              }
            </li>
          ))
        }


      </ul>
      <div className="flex flex-col space-y-0">
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-green-400">
            <BiCheckCircle />
          </svg>
          <div className="text-green-600 font-bold text-sm mb-3">Solicitudes de practicantes asignadas</div>
        </div>
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-yellow-400">
            <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
          </svg>
          <div className="text-yellow-600 font-bold text-sm mb-3">Solicitudes de practicantes pendientes de asignación</div>
        </div>
        <div className="flex">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-red-400">
            <MdCancel />
          </svg>
          <div className="text-red-600 font-bold text-sm mb-3">Solicitudes de practicantes rechazadas</div>
        </div>
      </div>
    </div>
  )
}