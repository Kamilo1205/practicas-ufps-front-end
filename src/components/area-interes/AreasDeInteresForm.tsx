import { Fragment } from 'react';
import { useFormContext } from 'react-hook-form';
import useAreasDeInteres from '../../hooks/useAreasInteres';

export const AreasDeInteresForm = () => {
  const { register, formState: { errors } } = useFormContext();
  const { areas } = useAreasDeInteres();
  
  const areasInteresErrors = errors.areasInteres as Record<string, { message: string }>;

  return (
    <>
      <div className="sm:rounded-lg ring-1 ring-gray-300 overflow-x-auto">
        <div className="min-w-max text-sm text-gray-900 leading-6">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="border-b px-4 py-3 text-left">Área de Interés (Seleccione su nivel de interés de 1 a 5)</th>
                {Array.from({ length: 5 }, (_, i) => (
                  <th key={i + 1} className="border-b px-4 py-3 text-center">{i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {areas.map((area, index) => (
                !area.areaPadre && (
                  <Fragment key={index}>
                    <tr>
                      <td className="border-b px-4 py-2.5">{area.nombre}</td>
                      {Array.from({ length: 5 }, (_, i) => (
                        <td key={i + 1} className="border-b align-middle px-4 py-2.5 text-center">
                          <input
                            type="radio"
                            className="cursor-pointer"
                            {...register(`areasInteres.${area.id}`, { required: true })}
                            value={i + 1}
                          />
                        </td>
                      ))}
                    </tr>
                    {/* Mensaje de error específico para el área */}
                    {
                      /*areasInteresErrors?.[area.id] && (
                        <tr>
                          <td colSpan={6} className="text-red-500 px-4 py-2">{areasInteresErrors[area.id].message}</td>
                        </tr>
                      )*/
                    }
                  </Fragment> 
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {areasInteresErrors && <p className="text-sm text-red-500">Debe seleccionar un nivel valido de interes en todas las areas</p>}
    </>
  );
}
