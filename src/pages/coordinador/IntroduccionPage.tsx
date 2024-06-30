
import { Link } from "react-router-dom"
import Title from "../../components/ui/Tittle/Title"




export const IntroduccionPage = () => { 

  return (<>
    <Title titulo='Primeros pasos'/>
    <div>
     
      <div className="flex h-full w-full items-center justify-center bg-white px-6">
        <div className="space-y-6 border-l-2 border-dashed">
          <div className="relative w-full">
            {
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-indigo-500">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            }
            <div className="ml-6">
              <h4 className="font-bold text-grey-500">¡Configura las fechas del calendario!</h4>
              <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                Las fechas de calendario son importantes para la habilitación de las diferentes funcionalidades de la plataforma.
              </p>
              <Link to={'/coordinador/calendario'} className="mt-1 block text-sm font-semibold text-blue-500">Da click aquí para configurar las fechas!</Link>
            </div>
          </div>
          <div className="relative w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-indigo-500">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12z" clipRule="evenodd" />
            </svg>

            <div className="ml-6">
              <h4 className="font-bold text-black">¡Revisa los grupos y docentes disponibles!</h4>
              <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                  Crea los grupos de practicas y docentes y asignalos.
              </p>
              <Link to={'/coordinador/configuraciones'} className="mt-1 block text-sm font-semibold text-blue-500">Da click aquí para ir al apartado de configuraciones!</Link>
            </div>
          </div>
          <div className="relative w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-indigo-500">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            <div className="ml-6">
              <h4 className="font-bold text-black">¡Haz las configuraciones generales!</h4>
              <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                Verifica que la <span className="text-black font-semibold">cuenta del director</span> y el <span className="text-black font-semibold">nombre y documento del decano</span> estén correctamente configurados y actualizados. Puedes encontrar está configuración en la pestaña de general.
                Tambien verifica que las <span className="text-black font-semibold">areas de interes, sub areas y herramientas </span>estén acorde a las necesidades del semestre.
              </p>
              <Link to={'/coordinador/configuraciones'} className="mt-1 block text-sm font-semibold text-blue-500">Da click aquí para ir al apartado de configuraciones!</Link>

            </div>
          </div>
          <div className="relative w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full text-indigo-500">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
            <div className="ml-6">
              <h4 className="font-bold text-black">¡Carga los estudiantes!</h4>
              <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                Ya estamos listos para empezar el semestre, solo hace falta cargar a los estudiantes de cada grupo!
              </p>
              <Link to={'/coordinador/estudiantes'} className="mt-1 block text-sm font-semibold text-blue-500">Da click aquí para ir al apartado de estudiantes!</Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  </>)
}