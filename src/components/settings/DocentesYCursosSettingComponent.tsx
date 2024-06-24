import { useEffect, useState } from "react";
import { useGrupos } from "../../hooks/useGrupos";
import { Button } from "../ui"
import Swal from "sweetalert2";
import { MdCancel, MdDelete, MdSave } from "react-icons/md";
import { SelectInputC } from "../ui/Input/SelectUIComponent";
import { DialogComponent } from "../ui/Dialog/DialogComponent";
import { AgregarDocenteForm } from "../ui/form/AgregarDocenteForm";
import { BiUserCircle } from "react-icons/bi";



interface DocenteI {
  id: string;
  nombre: string;
}

export const DocentesYCursosSettingComponent = () => { 
  const [docentesDispobibles, setDocentesDispobibles] = useState<DocenteI[]>([]);
  const [agregarDocente, setAgregarDocente] = useState(false);
  const {
    grupos,
    docentes,
    getDocentesDiponibles,
    crearNuevoGrupo,
    eliminarGrupo,
    obtenerSiguienteNombreGrupo,
    crearNuevoDocente,
    eliminarDocente
    
  } = useGrupos();

  console.log(docentes)

  const [edicion, setEdicion] = useState<{ editar: boolean }[]>([]);

  const cargarOpcionesDispobibles = ({ id, nombre }: { id?: string, nombre?: string }) => {

    const optiones = docentesDispobibles.map(
      (docente) => ({ id: docente.id, name: docente.nombre })
    )
    if (!id || !nombre) return optiones
    return [{ id, name: nombre }, ...optiones]
  }

  const onCrearNuevoGrupo = () => {
    Swal.fire({
      title: 'Crear un nuevo grupo',
      text: `Se crera el ${obtenerSiguienteNombreGrupo()} de practicas.`,
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
      text: `Estas seguro de eliminar al docente ${docente?.nombre}? No podras revertir esta accion! ${ gruposAsignados.length >0 ? 'Los siguientes grupos quedaran sin docente asignado: ' + gruposAsignados.map((grupo) => grupo.nombre).join(', '):''}`,

      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((r) => { 
      if(!r.isConfirmed) return
      eliminarDocente(docenteId)
      Swal.fire({
        title: 'Docente eliminado',
        text: `El docente ${docente?.nombre} ha sido eliminado.`,
        icon: 'success'
      })
    })
    
  }

  useEffect(() => {
    setEdicion(grupos.map(() => ({ editar: false })))
    const docDisp = getDocentesDiponibles()
    console.log('d',docentes)
    setDocentesDispobibles(docDisp)
    
  }, [grupos,docentes])

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
    <table className="w-full border-collapse indent-0 border-inherit mt-5 overflow-y-scroll">
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
            <tr key={grupo.id} className="border-t border-r border-gray-300">
              <td className="border-r border-gray-300 p-3">
                {

                  <span>{grupo.nombre}</span>

                }
              </td>
              <td className="flex w-full self-center border-r border-gray-300 p-3">
                {
                  edicion.length > 0 && edicion[index]?.editar ? (
                    <SelectInputC
                      selectedDefault={grupo.docente && { id: grupo.docente.id, name: grupo.docente.nombre } || undefined}
                      options={cargarOpcionesDispobibles({ id: grupo.docente?.id, nombre: grupo.docente?.nombre })}
                    />
                  ) : (
                    <span>{grupo.docente ? grupo.docente?.nombre : <span>Sin docente asignado</span>}</span>
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
    </table>
    <div className="text-gray-600 font-semibold text-lg mb-10 mt-10">
      Docentes de practicas
    </div>
    <div className="flex w-full justify-end space-x-1">
      <Button
        className="bg-blue-500 hover:bg-blue-600 w-fit px-4"
        onClick={()=>setAgregarDocente(true)}>
        Crear un nuevo docente
      </Button>

    </div>
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {
          docentes.map((docente) => (
            <li key={`doc-list-${docente.correo}`} className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                {
                  docente.fotoUrl ? (
                    <img className="h-10 w-10 rounded-full" src={docente.fotoUrl} alt="foto de perfil docente" />
                  ) : (
                      <BiUserCircle className="h-10 w-10 rounded-full text-gray-300" />
                  )
                  }
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{docente.nombre}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{docente.correo}</p>
                </div>
              </div>
              <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
                <Button
                  className="bg-red-500 hover:bg-red-400 w-fit px-4 self-center"
                  variant="outline"
                  onClick={() => {
                    onEliminarDocente(docente.id)
                  }}>
                  <span className="hidden lg:block text-white">Eliminar</span>
                  <MdDelete className="text-white " />
                </Button>
              </div>
            </li>
          ))
        }


      </ul>
    </div>

  </div>
}