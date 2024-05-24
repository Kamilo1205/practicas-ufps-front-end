import { useEffect, useState } from 'react';
import { AreaInteres } from '../../interfaces/area-interes';
import { fetchGetAreasDeInteresData } from '../../api/areasInteres.api';
import { Label } from '../ui';

export const AreasInteres = () => {
  const [areasInteres, setAreasInteres] = useState<AreaInteres[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const areaInteres = await fetchGetAreasDeInteresData();
      setAreasInteres(areaInteres);
      console.log(areaInteres);
    };
    fetchData();
    
  }, []);

  return (
    <>
      <div className="text-sm text-gray-900 leading-6 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-12">
        <div className="col-span-7">
          <Label>Areas de Interes (Seleccione su nivel de interes de 1 a 5)</Label>
        </div>
        {
          [1, 2, 3, 4, 5].map((level) => (
            <div className="col-span-1 items-center font-medium">
              {level}                
            </div>
          ))
        }
        <div className="col-span-full text-sm text-gray-600 -mt-1.5 mb-3">
          <p>Seleccione su nivel de interes donde 1 es muy poco interesado y 5 es muy interesado</p>
        </div>
        {
          areasInteres.map((areaInteres) => (
            <>
              <div className="col-span-7">
                {areaInteres.nombre}
              </div>
              {
                [1, 2, 3, 4, 5].map((level) => (
                  <div className="col-span-1 items-center">
                    <input
                      type="radio"
                      name={`area_interes_${areaInteres.id}`}
                      className="cursor-pointer"
                      value={level}
                    />
                  </div>
                ))
              }
            </>
          ))
        }
        <div className="col-span-full mt-4">
          {
            areasInteres.map((areaInteres) => (
              <div>
                <div className="font-medium">{ areaInteres.nombre }</div>
                <div>
                  {
                    areaInteres?.areaSubArea?.map((areaSubArea) => (
                      <div className="ml-6">
                        <div className="text-gray-950">
                          { areaSubArea.subAreasInteres.nombre }
                        </div>
                        <div className="ml-4 my-3 flex gap-4">
                          {
                            areaSubArea.herramientas.map((herramienta) => (
                              <label key={herramienta.id} className="bg-red-500">
                                <input
                                  type="radio"
                                  className=""
                                  name={`herramienta-${herramienta.id}`}
                                />
                                {herramienta.nombre}
                              </label>
                            ))
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
