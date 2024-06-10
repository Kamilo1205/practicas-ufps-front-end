import { useEffect, useState } from "react";
import { fetchEstudiantes as fetchGetEstudiantes } from "../../api/estudiante.api";
import { Avatar, Button, Pagination } from "../../components/ui";
import { EmptyStateMessage } from "../../components/estudiantes/EmptyStateMessage";
//import { useLocation, useNavigate } from "react-router-dom";
import { Estudiante } from "../../interfaces/estudiante.interface";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { TabComponent } from "../../components/ui/Tab/TabComponent";
import { DialogComponent } from "../../components/ui/Dialog/DialogComponent";
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from "@headlessui/react";
import clsx from "clsx";
import { HiMiniChevronDown } from 'react-icons/hi2';

const grupos = [
  {
    id: 1,
    name: "Grupo A",
  },
  {
    id: 2,
    name: "Grupo B",
  },
  {
    id: 3,
    name: "Grupo C",
  },
  
]

const AgregarEstudianteForm = ({onClose}:any) => {
  const [grupoSeleccionado, setGrupoSeleccionado] = useState({
    id: 0,
    name: '',
  })

  const [archivo, setArchivo] = useState<File | null>(null);

  const handleGuardar = () => { 
    console.log(grupoSeleccionado);
    console.log(archivo);
  }

  return (
    <div>
      <div className="mt-3 z-50">
        <Field>

        <Label htmlFor="grupo-listbox">Grupo</Label>
        <Listbox value={grupoSeleccionado} onChange={setGrupoSeleccionado}>
          <ListboxButton
            id={`grupo-listbox`}
            className={clsx(
              "relative block w-full rounded-md py-1.5 text-gray-900 pr-8 pl-3 shadow-sm ring-1 ring-inset ring-gray-300 text-left text-sm leading-6 capitalize",
              "focus:outline-none data-[focus]:ring-2  data-[focus]:ring-inset data-[focus]:ring-indigo-600 truncate"
            )}
          >
            {grupoSeleccionado.id !== 0 ? grupoSeleccionado.name: 'Seleccione un grupo'}
            <HiMiniChevronDown
              className="group pointer-events-none absolute top-2.5 right-2.5"
              aria-hidden="true"
            />
          </ListboxButton>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              anchor="bottom"
              className="z-50 w-[var(--button-width)] rounded-md border border-gray-200 bg-white p-1 [--anchor-gap:4px] focus:outline-none"
            >
              {
                grupos.map((grupo) => (
                  <ListboxOption
                    key={grupo.id}
                    value={grupo}
                    className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-gray-200 data-[selected]:bg-gray-300/90"
                  >
                    <div className="text-sm capitalize">{grupo.name}</div>
                  </ListboxOption>
                ))
              }
            </ListboxOptions>
          </Transition>
          </Listbox>
        </Field>

        <div className="mt-3">
          <label htmlFor="nombre">Archivo</label>
          <input
            type="file"
            accept=".txt"
            onChange={ (e) => setArchivo(e.target.files?.[0] || null)}
            id="nombre"
            name="nombre"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="flex mt-4">
        <Button className="mr-1 bg-red-400 hover:bg-red-700" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          disabled={grupoSeleccionado.id === 0 || archivo === null}
          onClick={handleGuardar}
          className={`${grupoSeleccionado.id === 0 || archivo === null ? 'bg-slate-400 hover:bg-slate-400' : ''} `}
        >
          Guardar
          
        </Button>
      </div>
    </div>
  )
}

export const EstudiantesPage = () => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); // Número total de ítems
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Suponiendo que el backend maneja 10 ítems por página
  const [agregarEstudiante, setAgregarEstudiante] = useState<boolean>(false);
  //const navigate = useNavigate();
  //const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchGetEstudiantes();
      setEstudiantes(response);
      console.log(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="mb-10">
        <div className="text-gray-600 font-bold text-2xl">Estudiantes</div>
      </div>
      <DialogComponent
        isOpen={agregarEstudiante}
        onClose={() => setAgregarEstudiante(false)}
        content={
          <AgregarEstudianteForm onClose={()=>setAgregarEstudiante(false)} />
        }
        title="Agregar estudiantes"
      />
      <div className="overflow-x-auto">
        <ul role="list" className="divide-y divide-gray-100">
          <li className="flex justify-between gap-x-6 py-2">
            <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">Grupo A</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <Button onClick={()=>setAgregarEstudiante(true)}>
                <HiOutlineUserPlus className="size-5 mr-2" />
                Agregar estudiantes
              </Button>
            </div>
          </li>
          
          </ul>
      </div> 
      <div className="mt-5">
        <TabComponent />

      </div>
      {estudiantes.length == 0 ? (
        <EmptyStateMessage />
      ) : (
          <div>
            <TabComponent/>
            <div className="overflow-x-auto">
              
            <table className="min-w-full border-gray-300">
              <thead>
                <tr>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Nombre
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Semestre
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Codigo
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Dirección
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Telefono
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Fecha creación
                  </th>
                  <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="border-gray-300 divide-y border-y">
                {estudiantes.map((estudiante) => (
                  <tr key={estudiante.id} className="cursor-pointer">
                    <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                      <div className="flex items-center">
                        <div className="shrink-0 w-11 h-11">
                          <Avatar url={estudiante?.usuario?.imagenUrl} />
                        </div>
                        <div className="ml-4">
                          <div className="text-gray-900 font-medium">
                            {
                              `${estudiante.primerNombre } ${estudiante.segundoNombre} ${estudiante.primerApellido} ${estudiante.segundoApellido}` 
                              || "Nombre aun no registrado"
                            }
                          </div>
                          <div className="text-gray-500 mt-1">
                            {estudiante?.usuario?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                        {estudiante.semestreMatriculado}
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                      <div>{estudiante.codigo}</div>
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                      <div>{estudiante.direccion}</div>
                      <div>
                        {estudiante?.ciudadResidencia?.departamento?.nombre},{" "}
                        {estudiante?.ciudadResidencia?.nombre }
                      </div>
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                      {estudiante.telefono}
                    </td>
                    <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                      {new Date(estudiante.fechaCreacion).toLocaleDateString()}
                    </td>
                    <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                      {estudiante?.usuario?.estaActivo ? (
                        <span className="text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">
                          Activo
                        </span>
                      ) : (
                        <span className="text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">
                          Inactivo
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            paginate={() => {}}
          />
        </div>
      )}
    </>
  );
};
