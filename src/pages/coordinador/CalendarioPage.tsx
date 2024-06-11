import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";
import { BiCheck } from "react-icons/bi";
dayjs().format()

interface TimelineItem {
  fechaInicial: string;
  fechaFinal: string;
  title: string;
  content: any;

}

interface ApiResponse { 
  ok: boolean;
  message: string;

}
/*
const prueba = ({ nombre = 'JJ' }: any) => {
  return <h1>{`Hola ${nombre}!`}</h1>
}
 */

const timelineItems = [
  {
    fechaInicial: '',
    fechaFinal: '2022-08-05',
    title: 'Inicio y cierre del semestre',
    content: 'Esta fecha marca el inicio de las clases del semestre 2022-2, ',
  },
  {
    fechaInicial: '2022-08-05',
    fechaFinal: '2022-08-05',
    title: 'Inscripción de datos por parte del estudiante',
    content: 'Plazo máximo para que los estudiantes diligencien el formulario de inscripción de de sus datos para las practicas profesionales',
  },
  {
    fechaInicial: '2022-08-08',
    fechaFinal: '2022-08-05',
    title: 'Entrega del plan de trabajo',
    content: 'Fecha límite para que los estudiantes entreguen la carta de presentación a la empresa',
  },
  {
    fechaInicial: '2022-11-01',
    fechaFinal: '2022-08-05',
    title: 'Entrega del primer informe',
    content: 'Se finalizan las clases del semestre 2022-2',
  },
  {
    fechaInicial: '2022-11-01',
    fechaFinal: '2022-08-05',
    title: 'Entregas del informe final',
    content: 'Se finalizan las clases del semestre 2022-2',
  },
  

]

const getCalendario = async () => { 
  return new Promise<TimelineItem[]>((resolve) => {
    setTimeout(() => {
      resolve(timelineItems)
    }, 2000)
  })

}

const guardarCambios = async (items: TimelineItem[]):Promise<ApiResponse> => { 
  return new Promise((resolve,) => {
    console.log('Guardando cambios',items)
    setTimeout(() => {
      resolve({
        ok: true,
        message: 'Cambios guardados'
      })
    }, 2000)
  })
}

const LoadingItemsComponent = () => {
  return <div className="flex justify-center items-center h-screen content-center">
    <div className="animate-spin rounded-full h-11 w-11 border-t-2 border-b-2 border-blue-900"></div>
  </div>
} 


export const CalendarioPage = () => {
  const [items, setItems] = useState<TimelineItem[]>([])
  const [edicion, setEdicion] = useState(items.map(() => {
    return {
      editar: false,
      fechaInicial: false,
      fechaFinal: false,
      valorEditadoFechaInicial: '',
      valorEditadoFechaFinal: ''
  }})) 
  const [loading, setLoading] = useState(true)
  /*
  const onFechaInicialChange = (date: string,index:number) => {
    //YYYY-MM-DD
    const nuevoEstado = [...items]
    nuevoEstado[index].fechaInicial = date
    setItems(nuevoEstado)
  }*/

  const saveChanges = async () => {
    //console.log('Guardando cambios')
    try {
      const response = await guardarCambios(items)
      if (!response.ok) throw new Error(response.message)
       const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Los cambios se guardaron correctamente"
      }); 
    }
    catch (error) { 
      console.error(error)
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron guardar los cambios',
        icon: 'error',
        confirmButtonText: 'Ok'
      }) 
    }
  }
  
  const onChangeEditarFechaInicial = (index: number) => { 
    const nuevoEstado = [...edicion]
    nuevoEstado[index].fechaInicial = !nuevoEstado[index].fechaInicial
    if (!nuevoEstado[index].fechaInicial) { 
      nuevoEstado[index].valorEditadoFechaInicial = items[index].fechaInicial
    }
    setEdicion(nuevoEstado)
  }
 
  const onChangeEditarFechaFinal = (index: number) => {
    const nuevoEstado = [...edicion]
    nuevoEstado[index].fechaFinal = !nuevoEstado[index].fechaFinal
    if (!nuevoEstado[index].fechaFinal) { 
      nuevoEstado[index].valorEditadoFechaFinal = items[index].fechaFinal
    }
    setEdicion(nuevoEstado)
  }
  const onChangeValorEditadoFechaInicial = (index: number, valor: string) => { 
    //YYYY-MM-DD
    const nuevoEstado = [...edicion]
    nuevoEstado[index].valorEditadoFechaInicial = valor
    setEdicion(nuevoEstado)
  
  }

  const onChangeValorEditadoFechaFinal = (index: number, valor: string) => {
    //YYYY-MM-DD
    const nuevoEstado = [...edicion]
    nuevoEstado[index].valorEditadoFechaFinal = valor
    setEdicion(nuevoEstado)
  }

  useEffect(() => {
    getCalendario().then((items) => {
      setItems(items)
      setEdicion(items.map((item) => { 
        return {
          editar: false,
          fechaInicial: false,
          fechaFinal: false,
          valorEditadoFechaInicial: item.fechaInicial,
          valorEditadoFechaFinal: item.fechaFinal
        }
      }))
      setLoading(false)
    })
   }, [])

  return (
    <>
      <h1 className="text-gray-600 font-bold text-2xl mb-5">Calendario</h1>

      {
        loading ? <LoadingItemsComponent />
          :
          <>
            <div className="flex w-full mb-4 justify-end">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={saveChanges}
              >Guardar cambios
              </button>

            </div>
            <div className="overflow-x-auto">
              <ul role="list" className="divide-y divide-gray-100">

                  {
                items.map((item, index) => (
                    <li key={`item-${index}-${item}`} className="flex justify-between gap-x-6 py-2">

                      <Disclosure as="div" className="p-3 w-full" defaultOpen={index === 0}>

                          
                        <DisclosureButton className="group flex w-full items-center justify-between">       
                          <div>
                            <span className="">{item.title}</span>
                            {
                              item.fechaInicial === '' || item.fechaInicial === null ?
                                <span className="ml-4 h-fit self-center text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-green-600 ring-inset">
                                  Fechas aún sin configurar
                                </span> :
                                <span className="ml-4 h-fit self-center text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">
                                  Asignadas 
                                </span>
                            }
                            
                          </div>
                          
                            <IoChevronDown className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                        </DisclosureButton>
                        <DisclosurePanel>
                          <div className="px-8 py-3">
                          
                              <div className="mt-3">
                              <dl className="divide-y divide-gray-100">
                                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    <span className="text-gray-600 font-medium">Fecha inicial</span>
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex content-center">
                                    <div className="relative flex gap-x-3 items-center">
                                      <div className="text-sm leading-6">
                                      <label htmlFor={`${index}-fechaInicialEdit`} className="font-medium text-gray-900">Editar</label>
                                      </div>
                                      <div className="flex h-6 items-center">
                                        <input
                                          id={`${index}-fechaInicialEdit`}
                                          name={`${index}-fechaInicialEdit`}
                                          type="checkbox"
                                          checked={edicion[index].fechaInicial}
                                          onChange={() => onChangeEditarFechaInicial(index)}
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                      </div>

                                    </div>
                                    <input
                                      
                                      type="date"
                                      disabled={!edicion[index].fechaInicial}
                                      className={`cursor-pointer border-0 ${!edicion[index].fechaInicial ? 'text-gray-500' : ''}`}
                                      value={edicion[index].valorEditadoFechaInicial}
                                      onChange={(e) => onChangeValorEditadoFechaInicial(index, e.target.value)}
                                    />
                                    {
                                      edicion[index].fechaInicial &&
                                      <button type="button"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        <BiCheck className="size-5 fill-white" />
                                      </button>
                                    }
                                    </dd>
                                </div>
                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    <span className="text-gray-600 font-medium">Fecha de cierre</span>
                                  </dt>
                                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex content-center">
                                    <div className="relative flex gap-x-3 items-center">
                                      <div className="text-sm leading-6">
                                        <label htmlFor={`${index}-fechaFinalEdit`} className="font-medium text-gray-900">Editar</label>
                                      </div>
                                      <div className="flex h-6 items-center">
                                        <input
                                          id={`${index}-fechaFinalEdit`}
                                          name={`${index}-fechaFinalEdit`}
                                          type="checkbox"
                                          checked={edicion[index].fechaFinal}
                                          onChange={ () => onChangeEditarFechaFinal(index)}
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                      </div>
                                      
                                    </div>
                                    <input
                                      type="date"
                                      disabled={!edicion[index].fechaFinal}
                                      className={`cursor-pointer border-0 ${!edicion[index].fechaInicial ? 'text-gray-500' : ''}`}
                                      value={edicion[index].valorEditadoFechaFinal}
                                      onChange={(e) => onChangeValorEditadoFechaFinal(index, e.target.value)}
                                    />
                                    {
                                      edicion[index].fechaFinal &&
                                      <button type="button"
                                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                        <BiCheck className="size-5 fill-white" />
                                      </button>
                                    }
                                </dd>
                                
                                </div>
                                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                  <dt className="text-sm font-medium leading-6 text-gray-900">
                                    
                                  </dt>
                                  
                                </div>
                              </dl>

                              
                            </div>
                          
                          </div>
                          
                          
                        </DisclosurePanel>
                      </Disclosure>
                    </li>

                          
                    ))
                  }
              </ul>
            </div>
          </>
      }
    </>
    
  )
}