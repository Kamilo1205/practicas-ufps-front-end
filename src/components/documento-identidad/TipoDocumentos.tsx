import { SelectHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { fetchGetTipoDocumentosData } from '../../api/tipoDocumento.api';
import { Label } from '../ui';
import { TipoDocumento } from '../../interfaces';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const TipoDocumentos= forwardRef<HTMLSelectElement, SelectProps>(({ className, id, ...props }, ref) => {
  const [tipoDocumentos, setTipoDocumentos] = useState<TipoDocumento[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const tipoDocumentos = await fetchGetTipoDocumentosData();
      setTipoDocumentos(tipoDocumentos);
    };
    fetchData();
  }, []);

  return (
    <>
      <Label>Tipo de documento</Label>
      <div className="mt-2">
        <select
          id={id}
          ref={ref}
          {...props}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          {
            tipoDocumentos.map(tipoDocumento => (
              <option 
                key={tipoDocumento.id} value={tipoDocumento.id}>
                { tipoDocumento.nombre }
              </option>
            ))
          }
        </select>
      </div>
    </>
  );
});
