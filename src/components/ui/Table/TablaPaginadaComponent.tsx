import { LuSearchCheck } from "react-icons/lu";
import { Pagination } from "../Pagination/Pagination";


interface TablaPaginadaProps { 
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  encabezados: string[];
  filas: any[];
  filtro: string;
  setFiltro: (filtro: string) => void;
}

export const TablaPaginadaComponent = ({

  totalItems,
  currentPage,
  itemsPerPage,
  encabezados,
  filas,
  filtro,
  setFiltro
}: TablaPaginadaProps) => { 

  
  return (<>
    <div className="overflow-x-auto">
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
      paginate={() => { }}
    />

  </>)
}