import { useState } from "react"
import { SolicitudPracticante } from "../../schemas/solicitudSchema"
import { DialogComponent } from "../ui/Dialog/DialogComponent"
import { EstudiantePerfilComponent } from "../usuarios/perfil/EstudiantePerfilComponent"
import { Estudiante } from "../../interfaces/estudiante.interface"
import useEstudiantes from "../../hooks/useEstudiantes"
import { BiError } from "react-icons/bi"


const SolicitudPendiente = () => { 
  return (
    <div className="flex">
      <span className="text-yellow-400 text-sm font-semibold self-center">Solicitud pendiente de asignación</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
        className="h-10 w-10 text-yellow-400 self-center">
        <title>Solicitud pendiente</title>
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
      </svg>
    </div>
  )
}

const SolicitudAsignada = () => { 
  return (
    <div className="flex">
      <span className="text-green-400 text-sm font-semibold self-center">Solicitud asignada</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
        className="h-10 w-10 text-green-400 self-center">
        <title>Solicitud asignada</title>
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h2a1 1 0 010 2h-2a1 1 0 01-1-1zm1-7a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 4z" clipRule="evenodd"></path>
      </svg>
    </div>
  )

}

interface SolicitudComponentProps { 
  solicitud: SolicitudPracticante | null

}

export const SolicitudComponent = ({ solicitud }: SolicitudComponentProps) => {
  
  //const [estudianteId, setEstudianteId] = useState<string>("")
  const [mostrarPerfil, setMostrarPerfil] = useState(false)
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState<Estudiante | null>(null)
  const [solicitudSeleccionada, ] = useState<SolicitudPracticante | null>(solicitud)
  console.log(solicitudSeleccionada)

  const { fetchEstudianteById } = useEstudiantes()
  
  const onEstudianteClick = (idEstudiante: string) => { 
    setMostrarPerfil(true)
    fetchEstudianteById(idEstudiante).then((estudiante) => { 
      console.log('aa',estudiante)
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
             <BiError className="text-red-500 w-10 h-10"/>
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
                solicitudSeleccionada?.estado === 'Asignada' ? <SolicitudAsignada /> : <SolicitudPendiente />
              }
            
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Número de practicantes</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {solicitudSeleccionada?.numeroPracticantes}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Perfiles solicitados</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul>
                {
                  solicitudSeleccionada?.perfil.areaConocimiento.map((area:string) => (
                    <li key={area}>{area}</li>
                  ))
               }
              
             </ul>
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Habilidades solicitadas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul>
                {
                  solicitudSeleccionada?.perfil.habilidades.map((habilidad:string) => (
                    <li key={habilidad}>{habilidad}</li>
                  ))
                }
              </ul>
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Herramientas solicitadas</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <ul className="flex space-x-2">
                {
                  solicitudSeleccionada?.perfil.herramientas.map((herramienta:string) => (
                    <li key={herramienta}>{herramienta}</li>
                  ))
                }
              </ul>
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Remuneración economica</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {solicitudSeleccionada?.remunerado ? 'Si' : 'No'}
            </dd>
          </div>
          <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Estudiantes asignados</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {
                solicitudSeleccionada?.estudiantesAsignados.map((estudiante) => (
                  <div key={estudiante.id}
                    onClick={() => onEstudianteClick(estudiante.id)}
                    className="flex space-x-2 cursor-pointer text-blue-500">
                    <span>{estudiante.codigo}</span>
                    <span>- {estudiante.nombre}</span>
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