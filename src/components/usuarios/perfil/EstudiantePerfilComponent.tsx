import { useState } from "react";
import { Estudiante } from "../../../interfaces/estudiante.interface";
import { Avatar } from "../../ui";
import { TabComponent } from "../../ui/Tab/TabComponent";

interface EstudiantePerfilProps { 
  estudiante: Estudiante;

}

const Tabs = [
  {
    id: 0,
    name: 'Información personal'
  },
  {
    id: 1,
    name: 'Datos de la practica'
  },
  {
    id: 2,
    name: 'Documentos'
  }
]

export const EstudiantePerfilComponent = ({estudiante}:EstudiantePerfilProps) => { 

  const [tab,setTab] = useState(0)
  return (<>
    
    <div className="">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Información del estudiante</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Todos los datos personales del estudiante.</p>
      </div>
      <TabComponent
        tabListI={Tabs}
        activeTab={tab}
        setTab={setTab}
      />
      <div className="mt-6 max-h-96 overflow-y-auto">
        {
          tab === 0 && (
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Nombre completo</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex content-center">
                  <div className="shrink-0 w-11 h-11">
                    <Avatar url={estudiante?.usuario?.imagenUrl} />
                  </div>
                  <span className="ml-2 self-center">
                    {
                      `${estudiante.primerNombre} ${estudiante.segundoNombre} ${estudiante.primerApellido} ${estudiante.segundoApellido}`
                      || "Nombre aun no registrado"
                    }
                  </span>
                  {
                    estudiante?.usuario?.estaActivo ? (
                      <span className="ml-4 h-fit self-center text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">
                        Activo
                      </span>
                    ) : (
                        <span className="ml-4 h-fit self-center text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">
                        Inactivo
                      </span>
                    )
                  }
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Código</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{estudiante.codigo}</dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Correo</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{estudiante.usuario.email}</dd>
              </div>
              
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Genero</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{estudiante.genero}</dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Telefono</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{estudiante.telefono}</dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Dirección</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{`${estudiante.direccion}, ${estudiante.ciudadResidencia.nombre}, ${estudiante.ciudadResidencia.departamento.nombre}`}</dd>
              </div>
              
              
            </dl>
          )
        }
        {
          tab === 1 && (
            <>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Empresa o dependencia asginada</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {
                    //TODO Agregar la empresa asignada
                    'Departamento de sistemas'
                  }
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Tutor asignado</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {
                    //TODO Agregar la empresa asignada
                    <a href=""><span className="text-blue-300">{ `Angelica Maria Hernandez` }</span></a>
                  }
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Plan de trabajo</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-full">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Entrega</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                         <a href=""><span className="text-blue-300">Ver entrega</span></a> 
                          
                        </dd>
                      </div>
                      
                    </li>
                    <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-full">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Aprovación del docente</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          
{`Pendiente por aprovación...`}
                        </dd>
                      </div>
                    </li>
                    <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-full">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Aprovación del Tutor</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {
                            //TODO Calificación del plan de trabajo.
                            `Pendiente por aprovación...`
                          }

                        </dd>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Primer informe</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-full">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Entrega</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a href=""><span className="text-blue-300">Ver entrega</span></a>


                        </dd>
                      </div>

                    </li>
                    <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-full">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Aprovación del docente</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {
                            //TODO Calificación del plan de trabajo.
                            `Pendiente por aprovación...`
                          }

                        </dd>
                      </div>
                    </li>
                    <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-full">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Aprovación del Tutor</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {
                            //TODO Calificación del plan de trabajo.
                            `Pendiente por aprovación...`
                          }

                        </dd>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Segundo informe</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-full">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Entrega</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          <a href=""><span className="text-blue-300">Ver entrega</span></a>


                        </dd>
                      </div>

                    </li>
                    <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-full">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Aprovación del docente</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {
                            //TODO Calificación del plan de trabajo.
                            `Pendiente por aprovación...`
                          }

                        </dd>
                      </div>
                    </li>
                    <li className="flex items-center justify-between pl-4 pr-5 text-sm leading-6">
                      <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 w-full">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Aprovación del Tutor</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {
                            //TODO Calificación del plan de trabajo.
                            `Pendiente por aprovación...`
                          }

                        </dd>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </>
            
          )
        }
        { 
          tab === 2 && (
            <>
              <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900 self-center">EPS</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">eps-1123.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Descargar</a>
                      </div>
                    </li>
                    
                  </ul>
                </dd>
              </div>
              <div className="px-3 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900 self-center">Cédula</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">documento-1123.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Descargar</a>
                      </div>
                    </li>
                    
                  </ul>
                </dd>
              </div>
              <div className="px-3 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900 self-center">Hoja de vida</dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
                        </svg>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">hv-1123.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Descargar</a>
                      </div>
                    </li>

                  </ul>
                </dd>
              </div>

            </>
                      )
        }
      </div>
    </div>
</>)
}