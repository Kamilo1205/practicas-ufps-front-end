/* eslint-disable @typescript-eslint/no-explicit-any */
import { LuSearchCheck } from "react-icons/lu";
import { Pagination } from "../Pagination/Pagination";
import LoadingSpinner from "../Pagination/LoadingSpiner";


interface TablaPaginadaProps {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  encabezados: string[];
  filas: any[];
  filtrar?: boolean;
  filtro?: string;
  setCurrentPage: (page: number) => void;
  setFiltro?: (filtro: string) => void;
  loading?: boolean;
}

const LoadingSkeletonComponent = () => {
  return (
    <div className="w-full">
      <div className="w-full max-w-md bg-white mx-auto rounded-lg p-4 shadow-lg">
        <div className="flex gap-2">
          <div className="w-16 h-16 shrink-0 bg-gray-300 rounded-full animate-pulse"></div>

        </div>
      </div>
    </div>

  )
}

export const TablaPaginadaComponent = ({

  totalItems,
  currentPage,
  itemsPerPage,
  encabezados,
  filas,
  filtrar = false,
  filtro,
  loading = false,
  setCurrentPage,
  setFiltro
}: TablaPaginadaProps) => {


  return (<>
    <div className="overflow-x-auto">
      {
        filtrar && setFiltro && (
          <div className="flex justify-end">
            <div className="w-fit flex content-center">
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">
                    <LuSearchCheck />
                  </span>
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Busqueda global" />

              </div>
            </div>
          </div>
        )
      }




      <table className="min-w-full border-gray-300">
        <thead>
          <tr>
            {
              encabezados.map((encabezado, index) => (
                <th key={index} className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                  {encabezado}
                </th>
              ))
            }

          </tr>
        </thead>
        <tbody className="border-gray-300 divide-y border-y">
          {
            loading ? <>
              {
                ['a', 'b', 'c'].map((v, i) => (
                  <tr key={`fila-skeleton-${v}-${i}`} className="text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">
                    {
                      encabezados.map((encabezado, index) => (
                        index == 1 ? <td key={`skeleton-${encabezado}-${index}`}>
                          <div className="flex gap-2 p-1">
                            <div className="w-11 h-11 shrink-0 bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="w-full space-y-1">
                              <div className="w-36 h-5 bg-gray-300 rounded-2xl animate-pulse"></div>
                              <div className="w-40 h-5 bg-gray-300 rounded-2xl animate-pulse"></div>
                            </div>
                          </div>
                        </td>
                          : <td key={index} className="text-sm whitespace-nowrap pl-0 pr-3 py-5 text-gray-500">
                            <div className="w-full h-5 bg-gray-300 rounded-2xl animate-pulse"></div>

                          </td>
                      ))
                    }

                  </tr>
                ))
              }
            </> :
              filas.map((fila, index) => (
                <tr key={index} className="">
                  {
                    fila.map((item, index) => (
                      <td key={index} className="text-sm whitespace-nowrap pl-0 pr-3 py-5 text-gray-500">
                        {item}
                      </td>
                    ))
                  }
                </tr>
              ))
          }

        </tbody>
      </table>
    </div>
    <Pagination
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      totalItems={totalItems}
      paginate={(pageNumber) => setCurrentPage(pageNumber)}
    />

  </>)
}