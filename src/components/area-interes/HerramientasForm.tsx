import { Fragment } from 'react';
import useAreasDeInteres from '../../hooks/useAreasInteres';
import { HerramientaCheckbox } from './HerramientaCheckbox';

export const HerramientasForm = () => {
  const { areas } = useAreasDeInteres();
  return (
    <div className="text-sm">
      {
        areas.map((area) =>
          area.areaSubArea && area.areaSubArea.length > 0 && (
            <Fragment key={area.id}>
              <div className="font-medium text-gray-900">{ area.nombre }</div>
              <div className="sm:pl-2">
                {
                  area.areaSubArea.map((areaSubArea) =>
                    areaSubArea.herramientas && areaSubArea.herramientas.length > 0 && (
                      <Fragment key={areaSubArea.id}>
                        <div>{ areaSubArea.subAreasInteres.nombre }</div>
                        <div className="flex p-4 gap-4">
                          {
                            areaSubArea.herramientas.map((herramienta) => (
                                <HerramientaCheckbox value={true} onChange={() => {}} {...herramienta} />
                              )
                            )
                          }
                        </div>
                      </Fragment>
                    )
                  )
                }    
              </div>
            </Fragment>
          )  
        )
      }
    </div>
  );
}
