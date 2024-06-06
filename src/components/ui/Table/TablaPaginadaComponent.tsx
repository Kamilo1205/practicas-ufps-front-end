import { Pagination } from "../Pagination/Pagination";


interface TablaPaginadaProps { 
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  encabezados: string[];
  filas: any[];
}

export const TablaPaginadaComponent = ({

  totalItems,
  currentPage,
  itemsPerPage,
  encabezados,
  filas }: TablaPaginadaProps) => { 

  
  return (<>
    <div className="overflow-x-auto">

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
                    <td key={index} className="text-sm whitespace-nowrap pl-0 pr-3 py-5 capitalize text-gray-500">
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