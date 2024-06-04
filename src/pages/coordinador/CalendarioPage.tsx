import { useEffect, useState } from "react"
import Swal from 'sweetalert2'

interface TimelineItem {
  date: string;
  title: string;
  content: any;

}

interface ApiResponse { 
  ok: boolean;
  message: string;

}

const prueba = ({ nombre = 'JJ' }: any) => {
  return <h1>{`Hola ${nombre}!`}</h1>
}


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
    content: prueba({ nombre: 'Juan' }),
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
  return new Promise((resolve, ) => {
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
    console.log('Guardando cambios')
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
                    <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Evento</th>
                    <th className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Fecha</th>
                  </tr>
                </thead>
                <tbody className="border-gray-300 divide-y border-y">
                  {
                    items.map((item,index) => (
                      <tr key={item.title} className="">
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

/**
 * 
 * 
 * <section className="relative flex flex-col justify-center  overflow-hidden antialiased">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-1">
          <div className="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-2">
            <div className="w-full max-w-3xl mx-auto">

              {/*<!-- Vertical Timeline #3 -->/}
<div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-[8.75rem] md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">

  {
    items.map((item, index) => <div key={item.title} className="relative">
      <div className="md:flex items-center md:space-x-4 mb-3">
        <div className="flex items-center space-x-4 md:space-x-2 md:space-x-reverse">
          {/*<!-- Icon -->/}
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow md:order-1">
            <svg className={`${index == 0 ? 'fill-emerald-500' : index === items.length - 1 ? 'fill-red-500' : 'fill-gray-500'}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16">
              <path d="M8 0a8 8 0 1 0 8 8 8.009 8.009 0 0 0-8-8Zm0 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
            </svg>
          </div>
          {/*<!-- Date -->/}
          <time className="text-sm font-medium text-indigo-500 md:w-28"><input type="datetime-local" className="w-full border border-gray-300 rounded p-1" /></time>
        </div>
        {/*<!-- Title -->/}
        <div className="text-slate-500 ml-14"><span className="text-slate-900 font-bold">{item.title}</span> 2024-01</div>
      </div>
      {/*<!-- Card -->/}
      <div className="bg-white p-4 rounded border border-slate-200 text-slate-500 shadow ml-14 md:ml-44">{item.content}</div>
    </div>

    )
  }

</div>
{/*} <!-- End: Vertical Timeline #3 -->/ }

            </div >

          </div >
        </div >
      </section >
 */