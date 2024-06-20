import { useEffect, useState } from "react";
import { TabComponent } from "../../components/ui/Tab/TabComponent"
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent";
import { useGrupos } from "../../hooks/useGrupos";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from "@headlessui/react";
import { HiMiniChevronDown } from "react-icons/hi2";
import clsx from "clsx";
import { Button } from "../../components/ui";
import { BiCheck } from "react-icons/bi";

const Tabs = [
  {
    name:'Grupos y docentes de practicas'
},
  {
    name:'Areas de Interes',
  },
]

interface SelectInputCI { 
  id: string;
  name: string;
}

interface SelectInputCProps { 
  selectedDefault?: SelectInputCI;
  options: SelectInputCI[];

}

const SelectInputC = ({selectedDefault,options}:SelectInputCProps) => {
  const [selected, setSelected] = useState<SelectInputCI | null>(selectedDefault || null);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  //TODO: Implementar guardar nueva seleccion.

  const onSeleccionar = (index:number) => {
    setSelected(options[index]);
    setOpen(false);
  }

  return (
    <div className="flex space-x-1">
      <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900"></label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          onBlur={() => setOpen(false)}
          type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
          <span className="flex items-center">
            {
              selected && (
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />

              )
            }
              <span className="ml-3 block truncate">{ selected ?  selected?.name: 'Seleccione un docente'}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fillRule="evenodd" d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z" clipRule="evenodd" />
            </svg>
          </span>
        </button>
        <Transition
          show={open}
          enter=""
          enterFrom=""
          enterTo=""
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
        <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">

            {
              options.map((option, index) => (
                <li
                  id={`op-${index}-${option.id}`} role="option"
                  key={`opkey-${index}-${option.id}`}
                  className={`relative cursor-default select-none py-2 pl-3 pr-9 ${highlightedIndex === index ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(null)}
                  onClick={() => onSeleccionar(index)}
                >
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                    <span className={`ml-3 block truncate ${highlightedIndex === index ? 'font-semibold' : 'font-normal'}`}>{ option.name}</span>
                  </div>

                  {
                    selected && selected.id === options[index].id && (
                      <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${highlightedIndex === index ? 'text-white' : 'text-indigo-600'}`}>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )
                  }
                </li>
              ))
            }

          </ul>
          </Transition>
      </div>
      
    </div>

  )
}

interface DocenteI {
  id: string;
  nombre: string;
}

interface GrupoI {
  id: string;
  nombre: string;
  docente: DocenteI | null;

}

export const ConfiguracionesPage = () => { 
  const [tab, setTab] = useState(0);
  const [docentesDispobibles, setDocentesDispobibles] = useState<DocenteI[]>([]);
  const { grupos,getDocentesDiponibles } = useGrupos();
 
  console.log(grupos)

  const [edicion, setEdicion] = useState<{editar:boolean}[]>([]);

  const cargarOpcionesDispobibles = ({ id, nombre }: { id?: string, nombre?: string }) => { 
    
    const optiones = docentesDispobibles.map(
      (docente) => ({ id: docente.id, name: docente.nombre })
    )
    if (!id || !nombre) return optiones
    return [{ id, name: nombre }, ...optiones]
  }
  
  useEffect(() => {
    setEdicion(grupos.map(() => ({ editar: false })))

    const docDisp = getDocentesDiponibles()
    console.log(docDisp)
    setDocentesDispobibles(docDisp )
  }, [grupos])

  console.log(edicion,'a')
  return (<>
    <div className="mb-10">
      <div className="text-gray-600 font-bold text-2xl mb-3">Configuraciones</div>
    </div>
    <>
      <TabComponent
        activeTab={tab}
        setTab={setTab}
        tabListI={Tabs}
      />
      {
        tab === 0 && (
          <div>
            <div className="text-gray-600 font-semibold text-lg">Grupos y docentes de practicas</div>

            <table className="w-full border-collapse indent-0 border-inherit">
              <thead className="">
                <tr className="mb-2">
                  <th className="border-r border-gray-100 py-2">Nombre</th>
                  <th className="border-r border-gray-100 py-2">Docente</th>
                  <th className="border-r border-gray-100 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody className="border-t border-gray-100">
                {
                  grupos.map((grupo, index) => (
                    <tr key={grupo.id} className="border-t border-r border-gray-100">
                      <td className="border-r border-gray-100 p-3">
                        {
                          
                            <span>{grupo.nombre}</span>
                          
                        }
                      </td>
                      <td className="flex w-full self-center border-r border-gray-100 p-3">
                        {
                          edicion.length > 0 && edicion[index].editar ? (
                            <SelectInputC
                              selectedDefault={grupo.docente && { id: grupo.docente.id, name: grupo.docente.nombre } || undefined}
                              options={cargarOpcionesDispobibles({ id: grupo.docente?.id, nombre: grupo.docente?.nombre })}
                            />
                          ) : (
                              <span>{grupo.docente ? grupo.docente?.nombre : <span>Sin docente asignado</span>}</span>
                          )
                        }
                      </td>
                      <td className="px-3">
                        {
                          edicion.length > 0 && edicion[index].editar ? (
                            <div className="flex space-x-1">
                              <Button
                                className="bg-green-500 hover:bg-green-600 w-fit px-4"
                                onClick={() => {
                                  const newEdicion = [...edicion]
                                  newEdicion[index].editar = false
                                  setEdicion(newEdicion)
                                }}>Guardar</Button>
                              <Button
                                className="bg-red-500 hover:bg-red-200 w-fit px-4"
                                variant="outline"
                                onClick={() => { 
                                  const newEdicion = [...edicion]
                                  newEdicion[index].editar = false
                                  setEdicion(newEdicion)
                                }}>Cancelar</Button>
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
           
          </div>
          
        )
      }
      {
        tab === 1 && (
          <div>
            <div className="text-gray-600 font-semibold text-lg">Areas de Interes</div>
          </div>
        )
      }
    </>
  </>)
}
/**
 * {
                          edicion.length > 0 && edicion[index].editar ? (
                            <button onClick={() => {
                              const newEdicion = [...edicion]
                              newEdicion[index].editar = false
                              setEdicion(newEdicion)
                            }}>Guardar</button>
                          ) : (
                            <button onClick={() => {
                              const newEdicion = [...edicion]
                              newEdicion[index].editar = true
                              setEdicion(newEdicion)
                            }}>Editar</button>
                          )
                        }
 */
