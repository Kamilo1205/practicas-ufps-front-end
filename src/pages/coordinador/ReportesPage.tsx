import { useEffect, useState } from "react";
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent";
import Title from "../../components/ui/Tittle/Title"
import { useReportes } from "../../hooks/useReportes";
import { useSemestre } from "../../hooks/useSemestre";
import Swal from "sweetalert2";
import { get } from "react-hook-form";


export const ReportesPage = () => {

  const [semestres, setSemestres] = useState([])
  const [cantidadEstudiantes, setCantidadEstudiantes] = useState({
    totalEstudiantes: 0,
    estudiantesSemestreActual: 0
  })
  console.log(cantidadEstudiantes)
  const [semestreSeleccionado, setSemestreSeleccionado] = useState("no-select")
  console.log(semestreSeleccionado)
  const {
    getTodoslosSemestres,
  } = useSemestre();
  console
  const {
    getCantidadesEstudiantes,
    getAsignacionesPorEstudiante,
    getAsignacionesPorSemestreId,
    getReportesEmpresasRegistradas,
    getReportesEmpresasConConvenioActivo,
    getReportesEstudiantesDelSemestreActual
  } = useReportes();

  const handleDownload = async () => {
    getReportesEstudiantesDelSemestreActual()
  };

  const handleDownloadEmpresas = async () => {
    getReportesEmpresasRegistradas()
  };

  const handleDownloadAsignaciones = async () => {
    getAsignacionesPorEstudiante()
  }

  const handleDownloadAsignacionesPorSemestre = async () => {

    if (semestreSeleccionado === 'no-select') {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Seleccione un semestre para descargar el reporte'
      })
    }
    getAsignacionesPorSemestreId(semestreSeleccionado)

  }

  const handleDownloadEmpresasConvenio = async () => {
    getReportesEmpresasConConvenioActivo()
  }

  useEffect(() => {
    getTodoslosSemestres().then(resp => {
      setSemestres(resp)
    })

    getCantidadesEstudiantes().then(resp => {
      console.log(resp)
      setCantidadEstudiantes(resp)
    })

  }, [])

  return (
    <div>
      <Title titulo="Reportes" />
      <div>
        <div className="flex flex-col sm:flex-row gap-4 p-1">

          <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Número Histórico de Estudiantes</h2>
            <p className="text-3xl font-bold text-blue-600">{cantidadEstudiantes?.totalEstudiantes}</p>
            <p className="text-sm text-gray-500">Estudiantes totales.</p>
          </div>


          <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Cantidad de Estudiantes Registrados en el Semestre Actual</h2>
            <p className="text-3xl font-bold text-green-600">{cantidadEstudiantes?.estudiantesSemestreActual}</p>
            <p className="text-sm text-gray-500">Estudiantes</p>
          </div>
        </div>

      </div>
      <TablaPaginadaComponent
        setCurrentPage={() => { }}
        itemsPerPage={10}
        currentPage={1}
        totalItems={10}
        filtrar={false}
        encabezados={["Nombre", "Descargar"]}
        filas={[
          [<span className="font-semibold">Reporte de estudiantes del semestre actual</span>,
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}>
            Descargar Reporte
          </button>
          ],
          [
            <div className="flex flex-row flex-wrap ">
              <span className="font-semibold">Reporte de estudiantes y empresas asignadas (Semestre actual) </span>
              <p className="font-light whitespace-normal">Corresponde a lás asignaciones de los estudiantes del semestre actual.</p>
            </div>,
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDownloadAsignaciones}>
              Descargar Reporte
            </button>
          ]
          ,
          [
            <div className="w-full">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                  <div className="flex flex-row flex-wrap ">
                    <span className="font-semibold">Reporte de estudiantes y empresas asignadas (seleccione un semestre ) </span>
                    <p className="font-light whitespace-normal">Corresponde a lás asignaciones de los estudiantes del semestre que usted seleccione.</p>
                  </div>,

                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="p-2">
                  <div>
                    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 ">Seleccione un semestre</label>
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={semestreSeleccionado}
                      onChange={(e) => setSemestreSeleccionado(e.target.value)}
                    >
                      <option value="no-select">Seleccione un semestre</option>
                      {semestres.map((semestre: any) => (
                        <option key={semestre.id} value={semestre.id}>
                          {semestre?.anio?.anio}-{semestre?.semestre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </details>
            </div>,
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDownloadAsignacionesPorSemestre}>
              Descargar Reporte
            </button>

          ]
          ,

          [
            <div className="flex flex-row flex-wrap ">
              <span className="font-semibold">Reporte de empresas registradas</span>
              <p className="font-light whitespace-normal">Corresponde a todas las empresas que completaron su proceso de registro, incluidas aquellas que están pendientes de la validación del convenio.  </p>
            </div>,
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleDownloadEmpresas}>
              Descargar Reporte
            </button>
          ],
          [<div className="flex flex-row flex-wrap ">
            <span className="font-semibold">Reporte de empresas con convenio activo</span>
            <p className="font-light whitespace-normal">Corresponde a aquellas empresas con un convenio activo registrado.</p>
          </div>,
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownloadEmpresasConvenio}>
            Descargar Reporte
          </button>
          ],

        ]}
      />
    </div>

  );

}


/**
 * [<div className="flex flex-row flex-wrap ">
            <span className="font-semibold">Reporte de estudiantes que desertaron de sus practicas</span>
            <p className="font-light whitespace-normal">Corresponde a aquellos estudiantes que al finalizar el semestre no tienen una entrega registrada de todos sus informes.  </p>
          </div>,
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}>
            Descargar Reporte
          </button>
          ]
,
          [<span className="font-semibold">Reporte de los tutores de las empresas activos registrados</span>,
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}>
            Descargar Reporte
          </button>
          ]
 */