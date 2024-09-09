import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { IoChevronDown } from "react-icons/io5";
import { useSemestre } from "../../hooks/useSemestre";
import { Semestre } from "../../schemas/semestreSchema";
dayjs().format()

interface TimelineItem {
  fechaInicial: string;
  fechaFinal: string;
  title: string;
  content: any;

}

/*
const prueba = ({ nombre = 'JJ' }: any) => {
  return <h1>{`Hola ${nombre}!`}</h1>
}
 */



const getCalendario = (semestre: Semestre) => {

  return [
    {
      fechaInicial: semestre.fechaInicio ? dayjs(semestre.fechaInicio).format('YYYY-MM-DD') : '',
      fechaFinal: semestre.fechaFin ? dayjs(semestre.fechaFin).format('YYYY-MM-DD') : '',
      title: 'Inicio y cierre del semestre',
      content: 'Esta fecha marca el inicio de las clases del semestre 2022-2, ',
    },
    {
      fechaInicial: semestre?.fechaInicioInscripcion ? dayjs(semestre?.fechaInicioInscripcion).format('YYYY-MM-DD') : '',
      fechaFinal: semestre?.fechaFinInscripcion ? dayjs(semestre?.fechaFinInscripcion).format('YYYY-MM-DD') : '',
      fechaPrimerEncuentro: semestre?.fechaPrimerEncuentro ? dayjs(semestre?.fechaPrimerEncuentro).format('YYYY-MM-DD') : '',
      title: 'Inscripción de datos por parte del estudiante',
      content: 'Plazo máximo para que los estudiantes diligencien el formulario de inscripción de de sus datos para las practicas profesionales',
    },
    {
      fechaInicial: semestre.fechaInicioPlanDeTrabajo ? dayjs(semestre.fechaInicioPlanDeTrabajo).format('YYYY-MM-DD') : '',
      fechaFinal: semestre.fechaFinPlanDeTrabajo ? dayjs(semestre.fechaFinPlanDeTrabajo).format('YYYY-MM-DD') : '',
      title: 'Entrega del plan de trabajo',
      content: 'Fecha límite para que los estudiantes entreguen la carta de presentación a la empresa',
    },
    {
      fechaInicial: semestre.fechaInicioPrimerInforme ? dayjs(semestre.fechaInicioPrimerInforme).format('YYYY-MM-DD') : '',
      fechaFinal: semestre.fechaFinPrimerInforme ? dayjs(semestre.fechaFinPrimerInforme).format('YYYY-MM-DD') : '',
      title: 'Entrega del primer informe',
      content: 'Se finalizan las clases del semestre 2022-2',
    },
    {
      fechaInicial: semestre.fechaInicioInformeFinal ? dayjs(semestre.fechaInicioInformeFinal).format('YYYY-MM-DD') : '',
      fechaFinal: semestre.fechaFinInformeFinal ? dayjs(semestre.fechaFinInformeFinal).format('YYYY-MM-DD') : '',
      title: 'Entregas del informe final',
      content: 'Se finalizan las clases del semestre 2022-2',
    },


  ]
}
/* 
const guardarCambios = async (items: TimelineItem[]): Promise<ApiResponse> => {
  return new Promise((resolve,) => {
    console.log('Guardando cambios', items)
    setTimeout(() => {
      resolve({
        ok: true,
        message: 'Cambios guardados'
      })
    }, 2000)
  })
} */

const LoadingItemsComponent = () => {
  return <div className="flex justify-center items-center h-screen content-center">
    <div className="animate-spin rounded-full h-11 w-11 border-t-2 border-b-2 border-blue-900"></div>
  </div>
}
interface EstadoFechas {
  editar: boolean;
  fechaPrimerEncuentro: boolean;
  fechaInicial: boolean;
  fechaFinal: boolean;
  valorEditadoFechaInicial: string;
  valorEditadoFechaFinal: string;
  valorEditadoPrimerEncuentro: string;
}


export const CalendarioPage = () => {

  const { semestre, loading, guardarCambiosDeFechas: guardarCambios } = useSemestre()
  const [items, setItems] = useState<TimelineItem[]>([])
  const [edicion, setEdicion] = useState<EstadoFechas[]>([])
  console.log(semestre)
  console.log(items)
  console.log(edicion)
  useEffect(() => {
    if (semestre) {
      const cal = getCalendario(semestre)
      setItems(cal)


    }
  }, [semestre])

  useEffect(() => {
    setEdicion(items.map((item) => {
      return {
        editar: false,
        fechaPrimerEncuentro: false,
        fechaInicial: false,
        fechaFinal: false,
        valorEditadoFechaInicial: item?.fechaInicial || '',
        valorEditadoFechaFinal: item?.fechaFinal || '',
        valorEditadoPrimerEncuentro: item?.fechaPrimerEncuentro || ''

      }
    }))
  }, [items])

  /*
  const onFechaInicialChange = (date: string,index:number) => {
    //YYYY-MM-DD
    const nuevoEstado = [...items]
    nuevoEstado[index].fechaInicial = date
    setItems(nuevoEstado)
  }*/

  const saveChanges = async () => {
    console.log('Guardando cambios')
    try {
      const semestreActualizado = {
        ...semestre,
        fechaInicio: edicion[0].valorEditadoFechaInicial !== '' ? edicion[0].valorEditadoFechaInicial : semestre?.fechaInicio,
        fechaFin: edicion[0].valorEditadoFechaFinal !== '' ? edicion[0].valorEditadoFechaFinal : semestre?.fechaFin,
        fechaInicioInscripcion: edicion[1].valorEditadoFechaInicial !== '' ? edicion[1].valorEditadoFechaInicial : semestre?.fechaInicioInscripcion,
        fechaFinInscripcion: edicion[1].valorEditadoFechaFinal !== '' ? edicion[1].valorEditadoFechaFinal : semestre?.fechaFinInscripcion,
        fechaPrimerEncuentro: edicion[1].valorEditadoPrimerEncuentro !== '' ? edicion[1].valorEditadoPrimerEncuentro : semestre?.fechaPrimerEncuentro,
        fechaInicioPlanDeTrabajo: edicion[2].valorEditadoFechaInicial !== '' ? edicion[2].valorEditadoFechaInicial : semestre?.fechaInicioPlanDeTrabajo,
        fechaFinPlanDeTrabajo: edicion[2].valorEditadoFechaFinal !== '' ? edicion[2].valorEditadoFechaFinal : semestre?.fechaFinPlanDeTrabajo,
        fechaInicioPrimerInforme: edicion[3].valorEditadoFechaInicial !== '' ? edicion[3].valorEditadoFechaInicial : semestre?.fechaInicioPrimerInforme,
        fechaFinPrimerInforme: edicion[3].valorEditadoFechaFinal !== '' ? edicion[3].valorEditadoFechaFinal : semestre?.fechaFinPrimerInforme,
        fechaInicioInformeFinal: edicion[4].valorEditadoFechaInicial !== '' ? edicion[4].valorEditadoFechaInicial : semestre?.fechaInicioInformeFinal,
        fechaFinInformeFinal: edicion[4].valorEditadoFechaFinal !== '' ? edicion[4].valorEditadoFechaFinal : semestre?.fechaFinInformeFinal,
      }
      console.log(semestreActualizado)
      const response = await guardarCambios(semestreActualizado)

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

  const onChangeEditarPrimerEncuentro = (index: number) => {
    const nuevoEstado = [...edicion]
    nuevoEstado[index].fechaPrimerEncuentro = !nuevoEstado[index].fechaPrimerEncuentro
    if (!nuevoEstado[index].fechaPrimerEncuentro) {
      nuevoEstado[index].valorEditadoPrimerEncuentro = items[index].fechaInicial
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

  const onChangePrimerEncuentro = (index: number, valor: string) => {
    //YYYY-MM-DD
    const nuevoEstado = [...edicion]
    nuevoEstado[index].valorEditadoPrimerEncuentro = valor
    setEdicion(nuevoEstado)
  }



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
                  items.length === edicion.length && items.map((item, index) => (
                    <li key={`item-${index}-${item}`} className="flex justify-between gap-x-6 py-2">

                      <Disclosure as="div" className="p-3 w-full" defaultOpen={index === 0}>


                        <DisclosureButton className="group flex w-full items-center justify-between">
                          <div>
                            <span className="">{item.title}</span>
                            {
                              (item.fechaInicial === '' || item.fechaInicial === null)
                                ||
                                (item.fechaFinal === '' || item.fechaFinal === null)
                                ?
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
                                          onChange={() => onChangeEditarFechaFinal(index)}
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

                                  </dd>
                                </div>
                                {
                                  item.title === 'Inscripción de datos por parte del estudiante' &&
                                  <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                      <span className="text-gray-600 font-medium">Fecha del primer encuentro</span>
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 flex content-center">
                                      <div className="relative flex gap-x-3 items-center">
                                        <div className="text-sm leading-6">
                                          <label htmlFor={`${index}-fechaEncuentroEdit`} className="font-medium text-gray-900">Editar</label>
                                        </div>
                                        <div className="flex h-6 items-center">
                                          <input
                                            id={`${index}-fechaEncuentroEdit`}
                                            name={`${index}-fechaEncuentroEdit`}
                                            type="checkbox"
                                            checked={edicion[index].fechaPrimerEncuentro}
                                            onChange={(e) => onChangeEditarPrimerEncuentro(index, e.target.value)}
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                        </div>

                                      </div>
                                      <input
                                        type="date"
                                        disabled={!edicion[index].fechaPrimerEncuentro}
                                        className={`cursor-pointer border-0 ${!edicion[index].fechaInicial ? 'text-gray-500' : ''}`}
                                        value={edicion[index].valorEditadoPrimerEncuentro}
                                        onChange={(e) => onChangePrimerEncuentro(index, e.target.value)}
                                      />

                                    </dd>

                                  </div>
                                }

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