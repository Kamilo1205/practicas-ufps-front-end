import { useEffect, useState } from "react"
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent"
import Title from "../../components/ui/Tittle/Title"
import { fetchEstudiantes as fetchGetEstudiantes } from "../../api/estudiante.api";
import { EstudianteI } from "../../interfaces/responses.interface";
import { enviarArlApi } from "../../api/arl.pai";
import Swal from "sweetalert2";
import LoadingSpinner from "../../components/ui/Pagination/LoadingSpiner";




export const ArlPage = () => {


  const [estudiantes, setEstudiantes] = useState<EstudianteI[]>([])
  const [filtro, setFiltro] = useState('')
  //const [selected, setSelected] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [totalItems, setTotalItems] = useState(0)
  const [loadign, setLoading] = useState(false)
  const onEviarArl = async () => {
    Swal.fire({
      title: 'Enviando los datos...',
      text: 'Por favor, espere.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    enviarArlApi().then((res) => {
      Swal.close();
      Swal.fire({
        title: 'Datos enviados',
        text: 'Los datos de afiliacion a EPS de los estudiantes han sido enviados correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }).catch(() => {
      Swal.close();
      Swal.fire({
        title: 'Error',
        text: 'No se pudieron enviar los datos',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [filtro]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      //TODO: Implementar peti para que solo traiga inactivos.
      //const {data,total} = await fetchGetEstudiantes(currentPage,itemsPerPage,Tabs[tab].grupo, filtro);
      const data = await fetchGetEstudiantes(currentPage, itemsPerPage, '', filtro);
      console.log(data)
      setTotalItems(data.meta.totalItems);
      setEstudiantes(data.data || [])
      setLoading(false);
      //console.log(data);
    };
    fetchData();
  }, [filtro, currentPage, itemsPerPage]);

  return (<>
    <Title titulo="ARL" />
    <div className="space-y-2">
      <h2 className="font-semibold">Enviar datos de afiliacion a EPS de los estudiantes</h2>
      <button
        onClick={onEviarArl}
        className="bg-green-500 p-2 rounded-md text-white">Enviar datos de EPS</button>
    </div>
    {
      loadign ? <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div> :
        <div>

          <div>

            <TablaPaginadaComponent
              filtrar
              filtro={filtro}
              setFiltro={setFiltro}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              encabezados={["Codigo", "Nombre", "EPS"]}
              filas={
                estudiantes.map((estudiante) => [
                  estudiante.codigo,
                  `${estudiante.primerNombre} ${estudiante.segundoNombre} ${estudiante.primerApellido} ${estudiante.segundoApellido}`,
                  estudiante.eps ? estudiante.eps?.nombre : <span className="text-red-600">No ha registrado EPS</span>,

                ])
              }

            />
          </div>
        </div>
    }
  </>)
}