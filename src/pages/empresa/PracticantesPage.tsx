import { useEffect, useState } from "react";
import { useSolicitudes } from "../../hooks/useSolicitudes";


export const PracticantesPage = () => {

  const { solicitudes } = useSolicitudes()
  const [practicantes, setPracticantes] = useState<any[]>([]);
  useEffect(() => { 
   
  }, [solicitudes]);
  console.log(solicitudes);
  return (<>
    <div className="max-w-2xl">
      <ul role="list" className="divide-y divide-gray-100">
        {
          practicantes.map((practicante) => (
            <li className="flex justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">Leslie Alexander</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">leslie.alexander@example.com</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">Co-Founder / CEO</p>
                <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime="2023-01-23T13:23Z">3h ago</time></p>
              </div>
            </li>
          ))
        }
      </ul>
    </div>
  </>)
}