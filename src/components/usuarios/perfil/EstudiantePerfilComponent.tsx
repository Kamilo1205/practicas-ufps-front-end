import { useEffect, useState } from "react";
import { Avatar } from "../../ui";
import { TabComponent } from "../../ui/Tab/TabComponent";
import { EstudianteI } from "../../../interfaces/responses.interface";
import { roles } from "../../../interfaces/rol.interface";
import { fetchGetDocumentoPorId } from "../../../api/documento.api";
import { patchEstudiante } from "../../../api/estudiante.api";
import Swal from "sweetalert2";


interface EstudiantePerfilProps {
  estudiante: EstudianteI;
  rol?: string;
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

const permisos = {
  activacion: [roles.coordinador, roles.administrador],
  edicion: [roles.coordinador, roles.administrador, roles.estudiante],
  soloVista: [roles.tutor, roles.empresa, roles.director]
}

const getDownloadFileUrl = async (fileId: string,) => {
  try {
    const response = await fetchGetDocumentoPorId(fileId);

    const blob = new Blob([response]);
    const urlBlob = window.URL.createObjectURL(blob);
    return urlBlob;
  } catch (error) {
    console.error('Download error:', error);
  }

}
/**
 * ROL -> Adminstrador , Coordinador, Tutor, Empresa, Estudiante, Director de programa
 * 
 */


export const EstudiantePerfilComponent = ({ estudiante, rol = '' }: EstudiantePerfilProps) => {

  const puedeActivarDesactivar = permisos.activacion.includes(rol)
  //const puedeEditar = permisos.edicion.includes(rol)
  const soloVista = permisos.soloVista.includes(rol)
  //console.log('estudiante', estudiante)
  console.log('rol', rol)
  const [tab, setTab] = useState(0)
  const [loadingDocs, setLoadingDocs] = useState(false)
  const [documentosUrls, setDocumentosUrls] = useState({
    certificadoAfiliacionEpsUrl: '',
    documentoIdentidadUrl: '',
    hojaDeVidaUrl: ''
  })

  const [editar, setEditar] = useState({

    telefono: {
      editar: false,
      valor: estudiante?.telefono || ''
    },
    direccion: {
      editar: false,
      valor: estudiante?.direccionResidencia || ''
    },
    ciudadResidencia: {
      editar: false,
      valor: estudiante?.ciudadResidencia?.nombre || ''
    },
    eps: {
      editar: false,
      valor: estudiante?.eps?.nombre || ''
    }
  })

  const asignacion = estudiante?.asignaciones.find(asignacion => asignacion.solicitud?.semestre?.actual)
  console.log('asignacion', editar)

  const actualizarInfoEstudiante = () => {
    //TODO Actualizar la información del estudiante
    const datosActualizados = {
      telefono: editar.telefono.valor,
      direccionResidencia: editar.direccion.valor,

    }


    // Llamada para actualizar la información del estudiante
    patchEstudiante(datosActualizados)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Información actualizada',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch((error) => {
        console.error("Error actualizando estudiante:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la información',
          showConfirmButton: false,
          timer: 1500
        })
      });

    setEditar({
      telefono: {
        editar: false,
        valor: editar.telefono.valor
      },
      direccion: {
        editar: false,
        valor: editar.direccion.valor
      },
      ciudadResidencia: {
        editar: false,
        valor: editar.ciudadResidencia.valor
      },
      eps: {
        editar: false,
        valor: editar.eps.valor
      }
    });
  }

  useEffect(() => {
    if (estudiante &&
      estudiante?.certificadoAfiliacionEpsUrl &&
      estudiante?.documentoIdentidadUrl &&
      estudiante?.hojaDeVidaUrl) {
      setLoadingDocs(true)
      Promise.all([
        getDownloadFileUrl(estudiante?.certificadoAfiliacionEpsUrl),
        getDownloadFileUrl(estudiante?.documentoIdentidadUrl),
        getDownloadFileUrl(estudiante?.hojaDeVidaUrl)
      ]).then((urls) => {
        setDocumentosUrls({
          certificadoAfiliacionEpsUrl: urls[0] || '',
          documentoIdentidadUrl: urls[1] || '',
          hojaDeVidaUrl: urls[2] || ''
        })
        setLoadingDocs(false)
      })
    }
  }, [])

  const onActivarDesactivar = () => {
    //TODO Activar o desactivar el usuario
    const estaActivo = estudiante?.usuario?.estaActivo
    console.log(estaActivo)
  }

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
                    <Avatar url={estudiante?.usuario?.imagenUrl || ''} />
                  </div>
                  <span className="ml-2 self-center">
                    {
                      estudiante ? `${estudiante?.primerNombre || ''} ${estudiante?.segundoNombre || ''} ${estudiante?.primerApellido || ''} ${estudiante?.segundoApellido || ''}`
                        : 'Dato no registrado'
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
                  {
                    puedeActivarDesactivar && (
                      <button
                        onClick={onActivarDesactivar}
                        className="ml-4 self-center text-blue-600 cursor-pointer">
                        {
                          estudiante?.usuario?.estaActivo ? 'Desactivar' : 'Activar'
                        }
                      </button>
                    )
                  }
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Código</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{estudiante ? estudiante?.codigo : 'Dato no registrado' || ''}</dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Documento</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {estudiante ? estudiante?.numeroDocumento : 'Dato no registrado' || ''}</dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Correo</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{estudiante ? estudiante?.usuario?.email : 'Dato no registrado' || ''}</dd>
              </div>

              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Genero</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">{estudiante ? estudiante?.genero : 'Dato no registrado' || ''}</dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Telefono</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                  {
                    editar.telefono.editar ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="border border-gray-200 p-1 rounded-md"
                          defaultValue={estudiante?.telefono || ''}
                          onChange={(e) => setEditar({ ...editar, telefono: { editar: true, valor: e.target.value } })}
                        />
                        <button
                          onClick={() => actualizarInfoEstudiante()}
                          className="bg-green-600 text-white px-2 py-1 rounded-md">Guardar</button>
                        <button onClick={() => setEditar({ ...editar, telefono: { editar: false, valor: estudiante?.telefono || '' } })} className="bg-red-600 text-white px-2 py-1 rounded-md">
                          Cancelar</button>
                      </div>
                    ) : estudiante?.telefono || 'Dato no registrado' || ''
                  }
                  {
                    rol === roles.estudiante && !editar.telefono.editar && (
                      <div className="inline">
                        <button
                          onClick={() => setEditar({ ...editar, telefono: { editar: true, valor: estudiante?.telefono || '' } })}
                          className="ml-4 self-center text-blue-600 cursor-pointer">
                          Editar
                        </button>
                      </div>
                    )
                  }
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Dirección</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">


                  {
                    editar.direccion.editar ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="border border-gray-200 p-1 rounded-md"
                          defaultValue={estudiante?.direccionResidencia || ''}
                          onChange={(e) => setEditar({ ...editar, direccion: { editar: true, valor: e.target.value } })}
                        />
                        <button
                          onClick={() => actualizarInfoEstudiante()}
                          className="bg-green-600 text-white px-2 py-1 rounded-md">Guardar</button>
                        <button onClick={() => setEditar({ ...editar, direccion: { editar: false, valor: estudiante?.ciudadResidencia?.nombre } })} className="bg-red-600 text-white px-2 py-1 rounded-md">
                          Cancelar</button>
                      </div>
                    ) : estudiante?.direccionResidencia || 'Dato no registrado' || ''
                  }
                  {
                    rol === roles.estudiante && !editar.direccion.editar && (
                      <div className="inline">
                        <button
                          onClick={() => setEditar({
                            ...editar, direccion: {
                              editar: true,
                              valor: estudiante?.direccionResidencia || ''

                            }
                          })}
                          className="ml-4 self-center text-blue-600 cursor-pointer">
                          Editar
                        </button>
                      </div>
                    )
                  }

                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Ciudad de residencia</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                  {`${estudiante ? `${estudiante?.ciudadResidencia?.nombre}
                  `
                    : 'Dato no registrado' || ''} `}</dd>
              </div>

              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">EPS</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
                  {`${estudiante ? `${estudiante?.eps?.nombre},
                   ${estudiante?.ciudadResidencia?.departamento?.nombre}`
                    : 'Dato no registrado' || ''} `}</dd>
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
                    asignacion?.solicitud?.empresa?.nombreLegal || 'No asignado'
                  }
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">Tutor asignado</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {
                    //TODO Agregar la empresa asignada
                    asignacion?.tutor?.nombre ?
                      <a href=""><span className="text-blue-300">{
                        `${asignacion?.tutor?.nombre} ${asignacion?.tutor?.apellidos}`
                      }</span></a>
                      : 'No asignado'

                  }
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
                          <span className="truncate font-medium">
                            {
                              estudiante?.certificadoAfiliacionEpsUrl ? `certificado-afiliacion-eps-${estudiante?.codigo}.pdf` : 'No hay documento'
                            }
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {
                          loadingDocs ?
                            <div className=" bg-white">
                              <div className="flex justify-center items-center h-full">
                                <img className="h-5 w-5" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
                              </div>
                            </div> :
                            estudiante?.certificadoAfiliacionEpsUrl ? (
                              <a className="font-medium text-indigo-600 hover:text-indigo-500"
                                href={documentosUrls.certificadoAfiliacionEpsUrl}
                                download={`certificado-afiliacion-eps-${estudiante?.codigo}.pdf`}
                              >Descargar</a>
                            ) :
                              <span className="font-medium text-gray-400">No hay documento</span>
                        }
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
                          <span className="truncate font-medium">
                            {
                              estudiante?.documentoIdentidadUrl ? `documento-identidad-${estudiante?.codigo}.pdf` : 'No hay documento'
                            }
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {
                          loadingDocs ?
                            <div className=" bg-white">
                              <div className="flex justify-center items-center h-full">
                                <img className="h-5 w-5" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
                              </div>
                            </div> :
                            estudiante?.documentoIdentidadUrl ? (
                              <a href={documentosUrls.documentoIdentidadUrl}
                                download={`documento-identidad-${estudiante?.codigo}.pdf`}
                                target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">Descargar</a>
                            ) :
                              <span className="font-medium text-gray-400">No hay documento</span>
                        }
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
                          <span className="truncate font-medium">{
                            estudiante?.hojaDeVidaUrl ? `hoja-vida-${estudiante?.codigo}.pdf` : 'No hay documento'
                          }</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">

                        {
                          loadingDocs ?
                            <div className=" bg-white">
                              <div className="flex justify-center items-center h-full">
                                <img className="h-5 w-5" src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt="" />
                              </div>
                            </div>
                            : estudiante?.hojaDeVidaUrl ? (
                              <a href={documentosUrls.hojaDeVidaUrl}
                                download={`hoja-vida-${estudiante?.codigo}.pdf`}
                                target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">Descargar</a>
                            ) :
                              <span className="font-medium text-gray-400">No hay documento</span>
                        }
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