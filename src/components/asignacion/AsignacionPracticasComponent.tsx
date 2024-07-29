import Swal from "sweetalert2"
import { Button } from "../ui"
import { BiSearch } from "react-icons/bi"
import AvatarScore from "../ui/Avatar/AvatarScoreComponent"
import { IoChevronForward, IoClose } from "react-icons/io5"
import { EstudianteAspirante, Solicitud, } from "../../schemas/solicitudSchema"
import { useEffect, useState } from "react"

interface SolicitudPracticante {
  solicitud: Solicitud
  aspirantes: EstudianteAspirante[]
}

interface AsignacionPracticasComponentProps {
  solicitud: SolicitudPracticante
  setMostrarPerfil: (mostrar: boolean) => void
  getAspirantesASolicitud?: (idSolicitud: string) => Promise<any[]>

}

export const AsignacionPracticasComponent = ({ solicitud, setMostrarPerfil, }: AsignacionPracticasComponentProps) => {


  console.log('solicitud', solicitud)
  const [solicitudState,] = useState<Solicitud>(solicitud.solicitud)
  const [perfilSeleccionado, setPerfilSeleccionado] = useState<EstudianteAspirante | null>(null)
  console.log('perfilSeleccionado', perfilSeleccionado)
  const onAsignarPracticante = (nombrePracticante: string) => {
    Swal.fire({
      title: 'Asignar practicante',
      text: `¿Estás seguro de asignar a ${nombrePracticante} a esta solicitud?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Practicante asignado',
          text: `El practicante ${nombrePracticante} ha sido asignado a la solicitud`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        })

        setMostrarPerfil(false)
      }

    })
  }

  useEffect(() => {
    console.log('perfil seleccionado',)

  }, [])

  return (<>
    <div className="flex flex-col divide-y rounded-md">
      <div className="search">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">
              <BiSearch className="text-gray-500" />
            </span>
          </div>
          <input type="text" name="price" id="price" className="block w-full border-0 py-1.5 pl-7  text-gray-900 ring-0 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset focus:ring-0 sm:text-sm sm:leading-6" placeholder="Busqueda por nombre o código del estudiante" />

        </div>
      </div>
      <div className="flex divide-x space-x-2">
        <div className="flex flex-col divide-y">
          <div className="asignados-list pl-5 pb-4">
            <h2 className="text-gray-500 font-semibold text-sm text-opacity-100 pt-3">
              Estudiantes asignados - <span>{solicitudState.asignaciones.length}</span> de <span>{solicitudState.cantidadPracticantes}</span>
            </h2>

            <ul className="mt-2 max-h-20 overflow-y-scroll">
              {
                solicitudState.asignaciones && solicitudState.asignaciones.map((estudiante) => (
                  <li
                    key={estudiante.id}
                    onClick={() => setPerfilSeleccionado(estudiante)}
                    className={`flex cursor-pointer ${perfilSeleccionado && estudiante.id === perfilSeleccionado?.estudiante.id && 'bg-slate-100'} justify-between rounded-md w-72 pr-5 hover:bg-slate-100`}>
                    <div className="flex space-x-1">
                      <div>
                        <AvatarScore score={Number(estudiante?.puntaje)} />
                      </div>
                      <span className="font-normal text-sm text-gray-600 self-center">{estudiante.nombre}</span>
                    </div>

                    <div

                      className="self-center cursor-pointer">
                      <IoClose className="text-red-500 w-7 h-7" />
                    </div>
                  </li>
                ))
              }

            </ul>
          </div>
          <div className="list py-5 pl-5">
            <h2 className="text-gray-500 font-semibold text-sm text-opacity-100">Estudiantes encontrados</h2>
            <ul className="mt-2 overflow-y-scroll max-h-52">
              {

                solicitud?.aspirantes && solicitud?.aspirantes.map((aspirante) =>
                  <li
                    key={JSON.stringify(aspirante)}
                    onClick={() => setPerfilSeleccionado(aspirante)}
                    className={`flex ${perfilSeleccionado && aspirante?.estudiante.id === perfilSeleccionado?.estudiante.id && 'bg-slate-100'} justify-between rounded-md w-72 pr-5 hover:bg-slate-100 cursor-pointer`}>
                    <div className="flex space-x-1">
                      <div>
                        <AvatarScore score={Number(aspirante.score)} />
                      </div>
                      <span className="font-normal text-sm text-gray-600 self-center">
                        {aspirante?.estudiante?.primerNombre} {aspirante?.estudiante?.primerApellido}
                      </span>
                    </div>

                    <div className="self-center">
                      <IoChevronForward className="text-gray-500" />
                    </div>
                  </li>
                )

              }


            </ul>
          </div>
        </div>

        {
          perfilSeleccionado ?
            <div className="perfil w-80 flex flex-col divide-y overflow-y-scroll max-h-96">
              <div className="flex flex-col text-center mb-3">
                <div className="w-full flex justify-center">
                  <AvatarScore score={Number(perfilSeleccionado?.score)} size="medium" />
                </div>

                <span className="text-gray-600 font-semibold text-lg">{perfilSeleccionado?.estudiante?.primerNombre}</span>
                <span className="text-gray-500 font-normal text-sm">{perfilSeleccionado?.estudiante?.codigo}</span>
              </div>
              <div className="p-2 text-gray-500">

                <div className="pr-1">
                  <span className="font-semibold text-sm">Perfiles y puntajes</span>
                  <dl className="divide-y divide-gray-100">


                    {
                      perfilSeleccionado?.estudiante?.estudianteAreaInteres?.map((perfil) => (

                        solicitudState?.areasInteres?.map(areaInteres =>
                          perfil.areaInteres.id === areaInteres.id ? <div key={`${perfil.areaInteres.id}`} className="flex justify-between py-1">
                            <dt className="text-sm">{areaInteres.nombre}</dt>
                            <dd className="text-sm">{perfil.nivelInteres}</dd>
                          </div> : <></>
                        )

                      ))
                    }


                  </dl>
                </div>
                <div className="pr-1 flex flex-col">
                  <span className="font-semibold text-sm">Herramientas</span>
                  <div className="flex flex-wrap space-x-1 space-y-1 justify-center align-middle">

                    {
                      solicitudState?.herramientas?.map(herramienta => (

                        perfilSeleccionado?.estudiante?.herramientas?.find(h => h.id === herramienta.id) ? <span
                          key={`${herramienta}`}
                          className="text-sm bg-red-100 text-gray-600 px-1 py-0.5 rounded-md">{herramienta?.nombre}</span>
                          :
                          <span
                            key={`${herramienta}`}
                            className="text-sm bg-green-100 text-gray-600 px-1 py-0.5 rounded-md" > {herramienta?.nombre}
                          </span>

                      ))
                    }

                  </div>

                </div>
                <div className="mt-3">
                  <Button
                    disabled={solicitudState?.asignaciones?.length === 0 || solicitudState.asignaciones.length === solicitudState.cantidadPracticantes}
                    onClick={() => onAsignarPracticante('1152004 - Jeison Omar Ferrer Ortega')}>Asignar practicante</Button>
                </div>
              </div>
            </div>
            :
            <></>
        }

      </div>
    </div>
  </>)
}