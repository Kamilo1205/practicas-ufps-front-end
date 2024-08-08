import { useEffect, useState } from "react";
import { useSolicitudes } from "../../hooks/useSolicitudes";
import useEmpresas from "../../hooks/useEmpresas";
import { useAuth } from "../../contexts";
import { DialogComponent } from "../../components/ui/Dialog/DialogComponent";
import { Solicitud } from "../../schemas/solicitudSchema";
import { SelectInputC } from "../../components/ui/Input/SelectUIComponent";
import Swal from "sweetalert2";
import { BiCheck } from "react-icons/bi";
import Title from "../../components/ui/Tittle/Title";




export const PracticantesPage = () => {

  const { user } = useAuth();
  const { solicitudes } = useSolicitudes()
  const { tutores, getPracticantesDeEmpresa, getTutoresDeEmpresaActual, asignarTutorAsignacion } = useEmpresas();

  const [mostrarPerfil, setMostrarPerfil] = useState(false);
  const [practicantes, setPracticantes] = useState<any[]>([]);
  const [tutorSeleccionado, setTutorSeleccionado] = useState<any>();

  const [editar, setEditar] = useState<{
    tutor: boolean;
  }>({
    tutor: false,
  });
  const [practicanteSolicitud, setPracticanteSolicitud] = useState<Solicitud>();
  const [practicanteSeleccionado, setPracticanteSeleccionado] = useState<any>();


  console.log(practicantes);
  console.log(practicanteSolicitud);
  const handleVerPerfil = (practicante: any) => {
    setPracticanteSeleccionado(practicante);
    setMostrarPerfil(true);
  }
  const handleAsignarTutor = ({ tutor }: any) => {
    setEditar({ ...editar, tutor });
  }

  const buscarTutorEnSolicitud = (solicitud: Solicitud) => {
    return practicanteSolicitud?.asignaciones?.
      find((asignacion) => asignacion?.estudiante?.id === practicanteSeleccionado?.id)?.tutor
  }

  const asignarTutor = ({ tutor }: any) => {
    const tutorSelect = tutores.find((tutor) => tutor.id === tutorSeleccionado?.id)
    console.log(tutorSelect)
    if (!tutorSelect) return Swal.fire('Error', 'No se ha seleccionado un tutor', 'error')
    asignarTutorAsignacion(
      practicanteSolicitud?.asignaciones.find((asignacion) => asignacion?.estudiante?.id === practicanteSeleccionado?.id)?.id || '',
      tutorSelect.id
    )

  }

  const cargarOpcionesDispobibles = ({ id, nombre }: { id?: string, nombre?: string }) => {

    const optiones = tutores.map(
      (tutor) => ({ id: tutor.id, name: `${tutor?.nombre} ${tutor?.apellidos}` })
    )
    if (!id || !nombre) return optiones
    return [{ id, name: nombre }, ...optiones]
  }
  console.log(cargarOpcionesDispobibles({}))
  useEffect(() => {
    solicitudes.find((solicitud) => {
      solicitud.asignaciones.find((asignacion) => {
        asignacion?.estudiante?.id === practicanteSeleccionado?.id && setPracticanteSolicitud(solicitud)
      })
    })

  }, [practicanteSeleccionado])

  useEffect(() => {
    if (user) {
      getPracticantesDeEmpresa(user?.id || '').then((data) => {
        console.log(data);
        setPracticantes(data);
      });
      getTutoresDeEmpresaActual().then((data) => {
        console.log(data);
      });
    }
  }, [user]);

  return (<>
    <DialogComponent
      size="2xl"
      isOpen={mostrarPerfil}
      onClose={() => setMostrarPerfil(false)}
      title="Perfil del practicante"
      content={
        <div className="flex flex-col gap-y-4">
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Tutor</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex justify-between">
                  {
                    !editar.tutor ? practicanteSolicitud?.asignaciones.find(
                      (asignacion) => asignacion?.estudiante?.id === practicanteSeleccionado?.id)?.tutor
                      ? <span>{practicanteSolicitud?.asignaciones.find((asignacion) => asignacion?.estudiante?.id === practicanteSeleccionado?.id)?.tutor?.nombre} {practicanteSolicitud?.asignaciones.find((asignacion) => asignacion?.estudiante?.id === practicanteSeleccionado?.id)?.tutor?.apellidos}</span>
                      : <span>No asignado</span>

                      :
                      <div className="">
                        <SelectInputC
                          onChange={setTutorSeleccionado}
                          selectedDefault={
                            practicanteSolicitud?.asignaciones?.
                              find((asignacion) => asignacion?.estudiante?.id === practicanteSeleccionado?.id)?.tutor
                            && { id: buscarTutorEnSolicitud()?.id, name: buscarTutorEnSolicitud()?.nombre }
                            || undefined}
                          options={cargarOpcionesDispobibles({ id: buscarTutorEnSolicitud()?.id, nombre: buscarTutorEnSolicitud()?.nombres })}
                        />
                      </div>
                  }
                  <div >
                    {
                      !editar.tutor ? <span
                        className="mr-5 text-blue-500 cursor-pointer"
                        onClick={() => handleAsignarTutor({ ...editar, tutor: true })}>
                        Asignar
                      </span>
                        :
                        <div className="space-x-4">
                          <button
                            className="text-green-500"
                            onClick={() => asignarTutor({})}
                          >Guardar</button>
                          <button
                            onClick={() => handleAsignarTutor({ ...editar, tutor: false })}
                            className="text-red-600">Cancelar</button>
                        </div>
                    }
                  </div>
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Nombre</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {practicanteSeleccionado?.primerNombre} {practicanteSeleccionado?.segundoNombre}{practicanteSeleccionado?.primerApellido}{practicanteSeleccionado?.segundoApellido}
                </dd>
              </div>

              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Teléfono</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {practicanteSeleccionado?.telefono}
                </dd>
              </div>
              <div className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Herramientas</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {practicanteSolicitud?.herramientas?.map((herramienta) => herramienta?.nombre).join(', ')}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      }
    />
    <div className="max-w-2xl">
      <Title titulo="Practicantes" />
      <div>
        <span className="text-sm text-gray-500">
          A continuación puede seleccionar un perfil y asignar un tutor al practicante. La practicantes con <span><BiCheck className="text-green-500 w-6 h-6 inline" /></span> ya tienen tutor asignado.
        </span>
      </div>
      <ul role="list"

        className="divide-y divide-gray-100">
        {
          practicantes?.map((practicante) => (
            <li
              onClick={() => handleVerPerfil(practicante)}
              className="flex justify-between gap-x-6 py-5 cursor-pointer">
              <div className="flex min-w-0 gap-x-4">
                <div>
                  {solicitudes.find((solicitud) => solicitud.asignaciones.find((asignacion) => asignacion?.estudiante?.id === practicante?.id))?.asignaciones.find((asignacion) => asignacion?.estudiante?.id === practicante?.id)?.tutor
                    && <span >
                      <BiCheck className="text-green-500 w-6 h-6" />
                    </span>}
                </div>
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{practicante?.primerNombre} {practicante?.primerApellido}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{practicante?.usuario?.email}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-blue-500">
                  Ver perfil
                </p>

              </div>
            </li>
          ))
        }
      </ul>
    </div>
  </>)
}