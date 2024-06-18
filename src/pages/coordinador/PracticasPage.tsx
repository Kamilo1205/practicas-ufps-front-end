import { useEffect, useState } from "react"
import { TabComponent } from "../../components/ui/Tab/TabComponent"
import { IoChevronForward,  } from "react-icons/io5"
import { DialogComponent } from "../../components/ui/Dialog/DialogComponent"
import { SolicitudComponent } from "../../components/solicitudes/SolicitudComponent"
import { AsignacionPracticasComponent } from "../../components/asignacion/AsignacionPracticasComponent"
import { EstudianteAspirante, SolicitudPracticante } from "../../schemas/solicitudSchema"


const Tabs = [
  {
    name: 'Asignación de practicas',
  }
]


const getAspirantesPorSolicitud = (idSolicitud: string): Promise<EstudianteAspirante[]> => { 
  console.log('getAspirantesPorSolicitud',idSolicitud)
  return Promise.resolve([
    
    {
      id: '2',
      nombre: 'Jeison Omar Ferrer Ortega',
      codigo: '1152004',
      puntaje: '75',
      perfil: [{
        puntaje: 75,
        nombre: 'Desarrollo de software',
        habilidades: ['Conocimiento en React', 'Node.js', 'MongoDB'],
        herramientas: ['Visual Studio Code', 'Git', 'GitHub']

      }],
    },
    {
      id: '3',
      nombre: 'Jeison Omar Ferrer Ortega',
      codigo: '1152004',
      puntaje: '30',
      perfil: [{
        puntaje: 75,
        nombre: 'Desarrollo de software',
        habilidades: ['Conocimiento en React', 'Node.js', 'MongoDB'],
        herramientas: ['Visual Studio Code', 'Git', 'GitHub']

      }],
    },
    {
      id: '4',
      nombre: 'Jeison Omar Ferrer Ortega',
      codigo: '1152004',
      puntaje: '45',
      perfil: [{
        puntaje: 75,
        nombre: 'Desarrollo de software',
        habilidades: ['Conocimiento en React', 'Node.js', 'MongoDB'],
        herramientas: ['Visual Studio Code', 'Git', 'GitHub']

      }],
    },
    
  ])
}


const getSolicitudesPracticantes = (): Promise<SolicitudPracticante[]> => { 
  return Promise.resolve([
    {
      id: '1',
      empresa: {
        id: '1',
        nombre: 'Empresa 1',
      },
      perfil: {
        areaConocimiento: ['Desarrollo de software'],
        habilidades: ['Conocimiento en React', 'Node.js', 'MongoDB'],
        herramientas: ['Visual Studio Code', 'Git', 'GitHub','Tailwind'],
      },
      numeroPracticantes: 2,
      remunerado: true,
      estado: 'Pendiente',
      estudiantesAsignados: [
        {
          id: '1',
          nombre: 'Jeison Omar Ferrer Ortega',
          codigo: '1152004',
          puntaje: '90',
          perfil: [{
            puntaje: 75,
            nombre: 'Desarrollo de software',
            habilidades: ['Conocimiento en React', 'Node.js', 'MongoDB'],
            herramientas: ['Visual Studio Code', 'Git', 'GitHub']


          }],
        },
      ]
    },
    {
      id: '2',
      empresa: {
        id: '2',
        nombre: 'Empresa 2',
      },
      perfil: {
        areaConocimiento: ['Desarrollo de software'],
        habilidades: ['Conocimiento en React', 'Node.js', 'MongoDB'],
        herramientas: ['Visual Studio Code', 'Git', 'GitHub'],
      },
      numeroPracticantes: 1,
      remunerado: false,
      estado: 'Asignada',
      estudiantesAsignados:[]
    }

  ])
}

export const PracticasPage = () => { 

  const [solicitudes, setSolicitudes] = useState<SolicitudPracticante[]>([])
  //const [loading, setLoading] = useState(false)
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<SolicitudPracticante | null>(null)
  //const [perfilSeleccionado, setPerfilSeleccionado] = useState<EstudianteAspirante | null>(null)
  const [mostrarPerfil, setMostrarPerfil] = useState(false)
  const [mostrarSolicitud, setMostrarSolicitud] = useState(false)
  const [cargarAspirantes, setCargarAspirantes] = useState(false)

  const onAsignarPracticantes = (solicitud: SolicitudPracticante) => {
    setSolicitudSeleccionada(solicitud)
    setCargarAspirantes(true)

   }

  useEffect(() => {
    //setLoading(true)
    getSolicitudesPracticantes().then((data) => {
      setSolicitudes(data)
      //setLoading(false)
    })
  }, [])

  useEffect(() => { 
    if(solicitudSeleccionada && cargarAspirantes) { 
      getAspirantesPorSolicitud(solicitudSeleccionada.id).then((data) => { 
        setSolicitudSeleccionada({
          ...solicitudSeleccionada,
          aspirantes:data
        })
        setCargarAspirantes(false)
        setMostrarPerfil(true)
      })
    }
  }, [cargarAspirantes, solicitudSeleccionada])

  const [tab, setTab] = useState(0)

  return (<>
    <DialogComponent
      isOpen={mostrarSolicitud}
      onClose={() => setMostrarSolicitud(false)}
      content={
        <SolicitudComponent
          solicitud={solicitudSeleccionada}
        />
      }
      title=""
      size="2xl"
    />
    {
      solicitudSeleccionada &&
      <DialogComponent
      isOpen={mostrarPerfil}
      onClose={() => setMostrarPerfil(false)}
      content={
        <AsignacionPracticasComponent
          solicitud={solicitudSeleccionada}
          setMostrarPerfil={setMostrarPerfil}
        />
      }
      title=""
      size="2xl"
    />}
    <div className="mb-10">
      <div className="text-gray-600 font-bold text-2xl">Gestión de practicas</div>
    </div>

    <TabComponent
      tabListI={Tabs}
      activeTab={tab}
      setTab={setTab}
    />
    { 
      tab === 0 && ( 
        <div className="flex divide-x">
          <ul role="list" className="divide-y divide-gray-100 overflow-scroll max-h-screen w-full">
            {
              solicitudes.map((solicitud) => (
                <li
                  key={solicitud.id}
                  className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <div className="flex space-x-3">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {solicitud.empresa.nombre}
                        </p>
                        {
                          solicitud.estado === 'Asignada' ? (
                            <span className="text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">
                              Asignada
                            </span>
                          ) : (
                            <span className="text-orange-600 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">
                              Pendiente
                            </span>
                          )
                        }
                      </div>
                      

                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {solicitud.numeroPracticantes} {solicitud.numeroPracticantes >1 ? 'practicantes' : 'practicante'} - {solicitud.remunerado ? 'Remunerado' : 'No remunerado'}
                      </p>
                    </div>
                  </div>
                  <div className=" shrink-0 sm:flex sm:flex-col sm:items-end self-center">
                    <div
                      onClick={()=>setMostrarSolicitud(true)}
                      className="text-sm text-gray-900 self-center cursor-pointer">
                      <div className="flex space-x-1 text-blue-500">
                        <span>Ver solicitud</span>
                        <IoChevronForward className="self-center" />
                      </div>
                    </div>
                    <div
                      onClick={()=>onAsignarPracticantes(solicitud)}
                      className="text-sm text-gray-900 self-center cursor-pointer">
                      <div className="flex space-x-1 text-blue-500">
                        <span>Asignar practicante</span>
                        <IoChevronForward className="self-center" />
                      </div>
                    </div>
                  </div>
                </li>
              ))
            }
          </ul>
          
        </div>
       )
    }  

  </>)
}


/**
 * <DialogComponent
        isOpen={mostrarPerfil}
        onClose={() => setMostrarPerfil(false)}
        content={
          <EstudianteAspiranteComponent
            estudiante={estudianteSeleccionado}
          />
        }
        title=""
        size="2xl"
      />
 */