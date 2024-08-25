import Swal from "sweetalert2";
import { reportesEstudiantesDelSemestreActualApi, resportesEmpresasRegistradasApi } from "../../api/reportes.api";
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent";
import Title from "../../components/ui/Tittle/Title"


export const ReportesPage = () => {

  const handleDownload = async () => {
    try {
      Swal.fire({
        title: 'Generando...',
        text: 'Por favor, espere.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const pdfBlob = await reportesEstudiantesDelSemestreActualApi();
      Swal.close();
      // Crear una URL para el archivo PDF
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));

      // Crear un enlace para la descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte-estudiantes-semestre-actual.pdf');

      // Añadir el enlace al DOM y hacer clic en él
      document.body.appendChild(link);
      link.click();

      // Limpiar el DOM después de la descarga
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      Swal.close()
    }
  };


  const handleDownloadEmpresas = async () => {
    try {
      Swal.fire({
        title: 'Generando...',
        text: 'Por favor, espere.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
      const pdfBlob = await resportesEmpresasRegistradasApi();
      Swal.close();
      // Crear una URL para el archivo PDF
      const url = window.URL.createObjectURL(new Blob([pdfBlob]));

      // Crear un enlace para la descarga
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'reporte-estudiantes-semestre-actual.pdf');

      // Añadir el enlace al DOM y hacer clic en él
      document.body.appendChild(link);
      link.click();

      // Limpiar el DOM después de la descarga
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      Swal.close()
    }
  };

  return (
    <div>
      <Title titulo="Reportes" />
      <div>
        <div className="flex flex-col sm:flex-row gap-4 p-1">

          <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Número Histórico de Estudiantes</h2>
            <p className="text-3xl font-bold text-blue-600">300</p>
            <p className="text-sm text-gray-500">Estudiantes totales.</p>
          </div>


          <div className="bg-white shadow-md rounded-lg p-6 w-full sm:w-1/2">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Cantidad de Estudiantes Registrados en el Semestre Actual</h2>
            <p className="text-3xl font-bold text-green-600">60</p>
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
          [<span className="font-semibold">Reporte de estudiantes y empresas asignadas</span>,
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}>
            Descargar Reporte
          </button>
          ]
          ,
          [<div className="flex flex-row flex-wrap ">
            <span className="font-semibold">Reporte de estudiantes que desertaron de sus practicas</span>
            <p className="font-light whitespace-normal">Corresponde a aquellos estudiantes que al finalizar el semestre no tienen una entrega registrada de todos sus informes.  </p>
          </div>,
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}>
            Descargar Reporte
          </button>
          ],
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
            onClick={handleDownload}>
            Descargar Reporte
          </button>
          ],
          [<span className="font-semibold">Reporte de los tutores de las empresas activos registrados</span>,
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDownload}>
            Descargar Reporte
          </button>
          ]
        ]}
      />
    </div>

  );

}