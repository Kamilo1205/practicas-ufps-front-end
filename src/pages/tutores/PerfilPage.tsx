import { useState } from "react";
import { useAuth } from "../../contexts";

interface Tutor { 
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccionTrabajo: string;

}

export const PerfilPage = () => { 

  const { user } = useAuth()
  console.log(user)

  const [tutor, setTutor] = useState<Tutor | null>({
    id: "1",
    nombre: "Juan",
    apellidos: "Perez",
    email: "tutor@corre.com",
    telefono: "5731234567",
    direccionTrabajo: "calle 20 # 1-22"
  });
  return (<>
    <div className="mb-10">
      <div className="text-gray-600 font-bold text-2xl">Información personal</div>
    </div>
    <>
      <div>
        
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Nombre</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{tutor?.nombre }</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Correo</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ tutor?.email}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Telefono</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ tutor?.telefono}</dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">Dirección de trabajo</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ tutor?.direccionTrabajo}</dd>
            </div>
           
          </dl>
        </div>
      </div>

    </>
  </>)
}
