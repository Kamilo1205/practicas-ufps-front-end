import { useEffect, useState } from "react"
import { TabComponent } from "../../components/ui/Tab/TabComponent"
import { IoChevronForward } from "react-icons/io5"
import { BiSearch } from "react-icons/bi"
import { Button } from "../../components/ui"
import { DialogComponent } from "../../components/ui/Dialog/DialogComponent"
import Swal from "sweetalert2"




interface AvatarScoreProps { 
  score: number
  size?: 'small' | 'medium' | 'large'

}

const AvatarScore: React.FC<AvatarScoreProps> = ({ score, size='small' }:AvatarScoreProps) => {
  const sizeClass = size === 'small' ? 'w-12 h-12' : size === 'medium' ? 'w-24 h-24' : 'w-32 h-32'
  const sizeN = size === 'small' ?  35: size === 'medium' ? 50 : 45
  const radius = (sizeN / 2) - 2; // Ajustar el radio basado en el tamaño
  const strokeDasharray = 2 * Math.PI * radius;  // Circunferencia del círculo (2 * PI * radio) donde radio es 45
  const strokeDashoffset = ((100 - score) / 100) * strokeDasharray;

  const getColor = (score: number) => {
    const red = Math.min(255, 2 * (100 - score));
    const green = Math.min(255, 2 * score);
    return `rgb(${red},${green},0)`;
  };

  const strokeColor = getColor(score);

  return (
    <div className={`relative flex items-center justify-center ${sizeClass}`}>
      <div className={`${sizeClass} rounded-full overflow-hidden flex items-center justify-center`}>
        {/* Contenedor de la imagen o del puntaje */}
        <span style={{ color: strokeColor }}  className="text-sm font-bold">{score}</span>
      </div>
      {/* Círculo del borde */}
      <svg className={`absolute top-0 left-0 ${sizeClass} transform -rotate-90`}>
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-300"
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={strokeColor}
          strokeWidth="4"
          fill="transparent"
          className="transition-all duration-300"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default AvatarScore;


const Tabs = [
  {
    name: 'Asignación de practicas',
  }
]

interface SolicitudPracticante { 
  id: number
  empresa: {
    id: string
    nombre: string
  }
  perfil: {
    areaConocimiento: string[]
    habilidades: string[]
    herramientas: string[]
  }
  numeroPracticantes: number
  remunerado: boolean,
  estado: string

}

interface EstudiantePerfil { 
  id: string
  nombre: string
  codigo: string
  puntaje: string
  perfilesSeleccionados: {
    puntaje: number
    perfil: {
      areaConocimiento: string[]
      habilidades: string[]
      herramientas: string[]
    }
  }[]
  coincidencias: {
    nombre: string
    puntaje?: number
  }[]

}

const getEstudiantesPorSolicitud = () => { 
  return Promise.resolve([
    {
      id: '1',
      nombre: 'Jeison Omar Ferrer Ortega',
      codigo: '1152004',
      puntaje: '75',
      perfilesSeleccionados: [{
        puntaje: 4,
        perfil: {
          areaConocimiento: ['Desarrollo de software'],
          habilidades: ['Conocimiento en React', 'Node.js', 'MongoDB'],
          herramientas: ['Visual Studio Code', 'Git', 'GitHub','React'],
        }
      }],
      coincidencias: [
        {
          nombre: 'React',
        },
        {
          nombre: 'Desarrollo de software',
          puntaje: 4
        }
      ]
    }
  ])
}


const getSolicitudesPracticantes = () => { 
  return Promise.resolve([
    {
      id: 1,
      empresa: {
        id: '1',
        nombre: 'Empresa 1',
      },
      perfil: {
        areaConocimiento: ['Desarrollo de software'],
        habilidades: ['Conocimiento en React', 'Node.js', 'MongoDB'],
        herramientas: ['Visual Studio Code', 'Git', 'GitHub'],
      },
      numeroPracticantes: 2,
      remunerado: true,
      estado: 'Pendiente'
    },
    {
      id: 2,
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
      estado: 'Pendiente'
    }

  ])
}

export const PracticasPage = () => { 

  const [solicitudes, setSolicitudes] = useState<SolicitudPracticante[]>([])
  const [loading, setLoading] = useState(false)
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState<SolicitudPracticante | null>(null)
  const [perfilSeleccionado, setPerfilSeleccionado] = useState<EstudiantePerfil | null>(null)
  const [mostrarPerfil, setMostrarPerfil] = useState(false)
  useEffect(() => {
    setLoading(true)
    getSolicitudesPracticantes().then((data) => {
      setSolicitudes(data)
      setLoading(false)
    })
  }, [])

  const onAsignarPracticante = (nombrePracticante:string) => { 
    Swal.fire({
      title: 'Asignar practicante',
      text: `¿Estás seguro de asignar a ${nombrePracticante} a esta solicitud?`,	
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      
    }).then(() => {
      Swal.fire({
        title: 'Practicante asignado',
        text: `El practicante ${nombrePracticante} ha sido asignado a la solicitud`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
      })
      setMostrarPerfil(false)
     })
  }

  const [tab, setTab] = useState(0)

  return (<>
    <DialogComponent
      isOpen={mostrarPerfil}
      onClose={() => setMostrarPerfil(false)}
      content={
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
          <div className="flex divide-x space-x-5">
            <div className="list py-5 pl-5">
              <h2 className="text-gray-500 font-semibold text-sm text-opacity-100">Estudiantes encontrados</h2>
              <ul className="mt-2 overflow-y-scroll max-h-full">
                {
                  <li

                    className="flex justify-between rounded-md w-72 pr-5 hover:bg-slate-100">
                    <div className="flex space-x-1">
                      <div>
                        <AvatarScore score={80} />
                      </div>
                      <span className="font-normal text-sm text-gray-600 self-center">Jeison Omar Ferrer Ortega</span>
                    </div>

                    <div className="self-center">
                      <IoChevronForward className="text-gray-500" />
                    </div>
                  </li>

                }
                <li

                  className="flex justify-between rounded-md w-72 pr-5 hover:bg-slate-100">
                  <div className="flex space-x-1">
                    <div>
                      <AvatarScore score={70} />
                    </div>
                    <span className="font-normal text-sm text-gray-600 self-center">Jose Arturo</span>
                  </div>

                  <div className="self-center">
                    <IoChevronForward className="text-gray-500" />
                  </div>
                </li>
                <li

                  className="flex justify-between rounded-md w-72 pr-5 hover:bg-slate-100">
                  <div className="flex space-x-1">
                    <div>
                      <AvatarScore score={67} />
                    </div>
                    <span className="font-normal text-sm text-gray-600 self-center">Marco Ibarra</span>
                  </div>

                  <div className="self-center">
                    <IoChevronForward className="text-gray-500" />
                  </div>
                </li>
                <li

                  className="flex justify-between rounded-md w-72 pr-5 hover:bg-slate-100">
                  <div className="flex space-x-1">
                    <div>
                      <AvatarScore score={60} />
                    </div>
                    <span className="font-normal text-sm text-gray-600 self-center">Jairo Gil</span>
                  </div>

                  <div className="self-center">
                    <IoChevronForward className="text-gray-500" />
                  </div>
                </li>
                <li

                  className="flex justify-between rounded-md w-72 pr-5 hover:bg-slate-100">
                  <div className="flex space-x-1">
                    <div>
                      <AvatarScore score={54} />
                    </div>
                    <span className="font-normal text-sm text-gray-600 self-center">Cristian Alejandro</span>
                  </div>

                  <div className="self-center">
                    <IoChevronForward className="text-gray-500" />
                  </div>
                </li>
                <li

                  className="flex justify-between rounded-md w-72 pr-5 hover:bg-slate-100">
                  <div className="flex space-x-1">
                    <div>
                      <AvatarScore score={30} />
                    </div>
                    <span className="font-normal text-sm text-gray-600 self-center">Jose Camilo</span>
                  </div>

                  <div className="self-center">
                    <IoChevronForward className="text-gray-500" />
                  </div>
                </li>

              </ul>
            </div>
            <div className="perfil w-80 flex flex-col divide-y">
              <div className="flex flex-col text-center mb-3">
                <div className="w-full flex justify-center">
                  <AvatarScore score={79} size="medium" />
                </div>

                <span className="text-gray-600 font-semibold text-lg">Jeison Omar Ferrer Ortega</span>
                <span className="text-gray-500 font-normal text-sm">1152003</span>
              </div>
              <div className="p-2 text-gray-500">

                <div className="pr-1">
                  <span className="font-semibold text-sm">Perfiles y puntajes</span>
                  <dl className="divide-y divide-gray-100">
                    <div className="px-2 py-2 sm:grid sm:grid-cols-5 sm:gap-4 ">

                      {
                        [
                          {
                            nombre: 'Desarrollo de software (web, movil)',
                            puntaje: 4
                          },

                        ].map((perfil) => (
                          <>
                            <dt className="text-sm font-medium leading-6 text-gray-900 col-span-4">{perfil.nombre}</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1 sm:mt-0 justify-end">
                              <span>{perfil.puntaje}</span>
                            </dd>
                          </>


                        ))
                      }

                    </div>
                  </dl>
                </div>
                <div className="pr-1 flex flex-col">
                  <span className="font-semibold text-sm">Herramientas</span>
                  <div className="flex flex-wrap space-x-1 space-y-1 justify-center align-middle">
                    {
                      [
                        'Visual Studio Code',
                        'Git',
                        'React',

                      ].map((herramienta) => (
                        <span className="text-sm bg-green-100 text-gray-600 px-1 py-0.5 rounded-md">{herramienta}</span>
                      ))
                    }
                    {
                      [
                        'GitHub',
                        'Node.js',
                        'MongoDB',

                      ].map((herramienta) => (
                        <span className="text-sm bg-red-100 text-gray-600 px-1 py-0.5 rounded-md">{herramienta}</span>
                      ))
                    }
                  </div>

                </div>
                <div className="mt-3">
                  <Button onClick={()=>onAsignarPracticante('1152004 - Jeison Omar Ferrer Ortega')}>Asignar practicante</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      title=""
      size="2xl"
    />
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
                    <p className="text-sm text-gray-900 self-center">
                      <div className="flex space-x-1 text-blue-500">
                        <span>Ver solicitud</span>
                        <IoChevronForward className="self-center" />
                      </div>
                    </p>
                    <p
                      onClick={()=>setMostrarPerfil(true)}
                      className="text-sm text-gray-900 self-center cursor-pointer">
                      <div className="flex space-x-1 text-blue-500">
                        <span>Asignar practicante</span>
                        <IoChevronForward className="self-center" />
                      </div>
                    </p>
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
          <EstudiantePerfilComponent
            estudiante={estudianteSeleccionado}
          />
        }
        title=""
        size="2xl"
      />
 */