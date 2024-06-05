import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import dayjs from 'dayjs'
dayjs().format()

interface TimelineItem {
  date: string;
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
    date: '2022-08-01',
    title: 'Inicio del semestre',
    content: 'Esta fecha marca el inicio de las clases del semestre 2022-2, ',
  },
  {
    date: '2022-08-05',
    title: 'Fecha límite de inscripción de datos por parte del estudiante',
    content: 'Plazo máximo para que los estudiantes diligencien el formulario de inscripción de de sus datos para las practicas profesionales',
  },
  {
    date: '2022-08-08',
    title: 'Apertura de la entrega del plan de trabajo',
    content: 'Fecha límite para que los estudiantes entreguen la carta de presentación a la empresa',
  },
  {
    date: '2022-08-10',
    title: 'Fecha maxima para la entrega del plan de trabajo',
    content: `prueba({ nombre: 'Juan' })`,
  },
  {
    date: '2022-11-01',
    title: 'Apertura de entregas del primer informe',
    content: 'Se finalizan las clases del semestre 2022-2',
  },
  
  {
    date: '2022-11-01',
    title: 'Fecha maxima para la entrega del primer informe',
    content: 'Se finalizan las clases del semestre 2022-2',
  },
  {
    date: '2022-11-01',
    title: 'Apertura de entregas del informe final',
    content: 'Se finalizan las clases del semestre 2022-2',
  },
  {
    date: '2022-11-10',
    title: 'Fecha maxima para la entrega del informe final',
    content: 'Se finaliza el semestre 2022-2',
  },
  {
    date: '2022-11-25',
    title: 'Cierre del semestre',
    content: 'Se finaliza el semestre 2022-2',
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
  const [loading, setLoading] = useState(true)

  const onDateChange = (date: string,index:number) => {
    //YYYY-MM-DD
    const nuevoEstado = [...items]
    nuevoEstado[index].date = date
    setItems(nuevoEstado)
  }

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

  useEffect(() => {
    getCalendario().then((items) => {
      setItems(items)
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
              <table className="min-w-full border-gray-300">
                <thead>
                  <tr>
                    <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5"></th>
                    <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Evento</th>
                    <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Fecha</th>
                  </tr>
                </thead>
                <tbody className="border-gray-300 divide-y border-y">
                  {
                    items.map((item,index) => (
                      <tr key={item.title} className="">
                        <td className="p-4 cursor-help">
                          {
                            dayjs(item.date, 'YYYY-MM-DD').isAfter(dayjs()) ? <svg xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor"
                            >
                              <title>Fecha aún por ocurrir</title>
                              <path fillRule="evenodd" d="M10 2a8 8 0 0 0-8 8c0 4.42 3.58 8 8 8s8-3.58 8-8a8 8 0 0 0-8-8Zm0 14a6 6 0 1 1 0-12 6 6 0 0 1 0 12Zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V7a1 1 0 0 1 1-1Z"></path>
                            </svg>
                              : 
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <title>Esta fecha ya pasó</title>
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586l7.293-7.293a1 1 0 010 1.414z" clipRule="evenodd" />
                              </svg>
                          }
                        </td> 
                        <td className="text-sm whitespace-normal text-gray-500">
                          <span className="max-w-5">{item.title}</span></td>
                        <td className="text-sm whitespace-nowrap capitalize text-gray-500">
                          <input
                            type="date"
                            className="cursor-pointer border-0"
                            defaultValue={item.date}
                            onChange={(e) => onDateChange(e.target.value,index)}
                          />

                        </td>

                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </>
      }
    </>
    
  )
}