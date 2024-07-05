import { useEffect, useState } from "react";
import { useGrupos } from "../../hooks/useGrupos";
import { Button } from "../ui"
import Swal from "sweetalert2";
import { MdCancel, MdDelete, MdRestore, MdSave } from "react-icons/md";
import { SelectInputC } from "../ui/Input/SelectUIComponent";
import { DialogComponent } from "../ui/Dialog/DialogComponent";
import { AgregarDocenteForm } from "../ui/form/AgregarDocenteForm";
import { BiUserCircle } from "react-icons/bi";
import { useDocentes } from "../../hooks/useDocentes";
import { EmptyStateMessage } from "../estudiantes";



interface DocenteI {
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  fechaEliminacion?: Date;
}

export const DocentesYCursosSettingComponent = () => {
  const [docentesDispobibles, setDocentesDispobibles] = useState<DocenteI[]>([]);
  const [agregarDocente, setAgregarDocente] = useState(false);
  //const { docentes: doclist } = useDocentes()

  const {
    grupos,
    docentes,
    getDocentesDiponibles,
    crearNuevoGrupo,
    eliminarGrupo,
    obtenerSiguienteNombreGrupo,
    crearNuevoDocente,
    eliminarDocente,
    habilitarDocente,
    asignarDocenteGrupo

  } = useGrupos();
  //console.log('gruposAa', grupos)

  const [edicion, setEdicion] = useState<{ editar: boolean }[]>([]);
  const [docenteSeleccionado, setDocenteSeleccionado] = useState<DocenteI | null>(null)
  //console.log('docenteSelect', docenteSeleccionado)

  const cargarOpcionesDispobibles = ({ id, nombre }: { id?: string, nombre?: string }) => {

    const optiones = docentesDispobibles.map(
      (docente) => ({ id: docente.id, name: `${docente?.nombres} ${docente?.apellidos}` })
    )
    if (!id || !nombre) return optiones
    return [{ id, name: nombre }, ...optiones]
  }

  const onCrearNuevoGrupo = () => {
    Swal.fire({
      title: 'Crear un nuevo grupo',
      text: `Se creara el ${obtenerSiguienteNombreGrupo()} de practicas.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
    }).then((result) => {
      if (result.isConfirmed) {
        crearNuevoGrupo()
        Swal.fire(
          'Creado!',
          'El grupo ha sido creado.',
          'success'
        )
      }
    })
  }

  const onEliminarGrupo = () => {
    const grupoAElminar = grupos[grupos.length - 1].nombre
    Swal.fire({
      title: `¡Esto eliminará el ${grupoAElminar}! ¿Estas seguro?`,
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarGrupo()
        Swal.fire(
          'Eliminado!',
          `El ${grupoAElminar} ha sido eliminado.`,
          'success'
        )
      }
    })
  }

  const onEliminarDocente = (docenteId: string) => {
    const docente = docentes.find((doc) => doc.id === docenteId)
    const gruposAsignados = grupos.filter((grupo) => grupo.docente && grupo.docente.id === docenteId)
    Swal.fire({
      title: 'Eliminar docente',
      text: `Estas seguro de eliminar al docente ${docente?.nombres}? No podras revertir esta accion! ${gruposAsignados.length > 0 ? 'Los siguientes grupos quedaran sin docente asignado: ' + gruposAsignados.map((grupo) => grupo.nombre).join(', ') : ''}`,

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((r) => {
      if (!r.isConfirmed) return
      eliminarDocente(docenteId)
      Swal.fire({
        title: 'Docente eliminado',
        text: `El docente ${docente?.nombres} ha sido eliminado.`,
        icon: 'success'
      })
    })

  }

  const onAsignarDocente = (grupoId: string) => {
    asignarDocenteGrupo(grupoId, docenteSeleccionado?.id || null)
  }

  useEffect(() => {
    setEdicion(grupos.map(() => ({ editar: false })))
    const docDisp = getDocentesDiponibles()
    //console.log('d', docentes)
    setDocentesDispobibles(docDisp)

  }, [grupos, docentes])

  return <div>
    <DialogComponent
      isOpen={agregarDocente}
      onClose={() => setAgregarDocente(false)}
      content={
        <AgregarDocenteForm
          crearNuevoDocente={crearNuevoDocente}
          onClose={() => setAgregarDocente(false)}
        />
      }
      title="Agregar docente"
      size="lg"
    />
    <div className="text-gray-600 font-semibold text-lg mb-10">
      Grupos de practicas
    </div>
    <div className="flex w-full justify-end space-x-1">
      <Button
        className="bg-blue-500 hover:bg-blue-600 w-fit px-4"
        onClick={onCrearNuevoGrupo}>
        Crear un nuevo grupo
      </Button>
      <Button
        className="bg-red-500 hover:bg-red-600 w-fit px-4"
        onClick={onEliminarGrupo}>
        Eliminar un grupo
      </Button>
    </div>
    {grupos.length === 0 ? <EmptyStateMessage message="No hay grupos registrados" submesage="" /> : <table className="w-full border-collapse indent-0 border-inherit mt-5 overflow-y-scroll">
      <thead className="">
        <tr className="mb-2">
          <th className="border-r border-gray-300 py-2">Nombre</th>
          <th className="border-r border-gray-300 py-2">Docente</th>
          <th className="border-r border-gray-300 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody className="border-t border-gray-300">
        {
          grupos.map((grupo, index) => (
            !grupo.fechaEliminacion && <tr key={grupo.id} className="border-t border-r border-gray-300">
              <td className="border-r border-gray-300 p-3">
                {

                  <span>{grupo.nombre}</span>

                }
              </td>
              <td className="flex w-full self-center border-r border-gray-300 p-3">
                {
                  edicion.length > 0 && edicion[index]?.editar ? (
                    <SelectInputC
                      onChange={setDocenteSeleccionado}
                      selectedDefault={grupo.docente && { id: grupo.docente.id, name: grupo.docente.nombres } || undefined}
                      options={cargarOpcionesDispobibles({ id: grupo.docente?.id, nombre: grupo.docente?.nombres })}
                    />
                  ) : (
                    <span>{grupo.docente ? grupo.docente?.nombres : <span className="text-red-500">Sin docente asignado</span>}</span>
                  )
                }
              </td>
              <td className="px-3 max-w-fix">
                {
                  edicion.length > 0 && edicion[index]?.editar ? (
                    <div className="flex space-x-1 sm:flex-wrap">
                      <Button
                        className="bg-green-500 hover:bg-green-600 w-fit px-4"
                        onClick={() => {
                          onAsignarDocente(grupo.id)
                          const newEdicion = [...edicion]
                          newEdicion[index].editar = false
                          setEdicion(newEdicion)
                        }}>
                        <span className="hidden lg:block">Guardar</span>
                        <MdSave className="text-white lg:hidden" />
                      </Button>
                      <Button
                        className="bg-red-500 hover:bg-red-200 w-fit px-4"
                        variant="outline"
                        onClick={() => {
                          const newEdicion = [...edicion]
                          newEdicion[index].editar = false
                          setEdicion(newEdicion)
                        }}>
                        <span className="text-white hidden lg:block">Cancelar</span>
                        <MdCancel className="text-white lg:hidden" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-1">
                      <Button
                        className="px-4 w-fit"
                        onClick={() => {
                          const newEdicion = [...edicion]
                          newEdicion[index].editar = true
                          setEdicion(newEdicion)
                        }}>Editar</Button>

                    </div>
                  )
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>}
    <div className="text-gray-600 font-semibold text-lg mb-10 mt-10">
      Docentes de practicas
    </div>
    <div className="flex w-full justify-end space-x-1">
      <Button
        className="bg-blue-500 hover:bg-blue-600 w-fit px-4"
        onClick={() => setAgregarDocente(true)}>
        Crear un nuevo docente
      </Button>

    </div>
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {
          docentes.map((docente) => (
            <li key={`doc-list-${docente.email}`} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                {
                  docente.fotoUrl ? (
                    <img className="h-10 w-10 rounded-full" src={docente.fotoUrl} alt="foto de perfil docente" />
                  ) : (
                    <BiUserCircle className="h-10 w-10 rounded-full text-gray-300" />
                  )
                }
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{docente.nombres} {docente.apellidos}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{docente.email}</p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">

                {
                  !docente.fechaEliminacion ? <Button
                    className="bg-red-500 hover:bg-red-400 w-fit px-4 self-center"
                    variant="outline"
                    onClick={() => {
                      onEliminarDocente(docente.id)
                    }}>
                    <span className="hidden lg:block text-white">Eliminar</span>
                    <MdDelete className="text-white " />
                  </Button> :
                    <Button
                      className="bg-red-500 hover:bg-red-400 w-fit px-4 self-center"
                      variant="outline"
                      onClick={() => {
                        habilitarDocente(docente.id)
                      }}>
                      <span className="hidden lg:block text-white">Habilitar</span>
                      <MdRestore className="text-white " />
                    </Button>

                }
              </div>
            </li>
          ))
        }


      </ul>
    </div>

  </div>
}