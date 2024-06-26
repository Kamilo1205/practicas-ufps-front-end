import { DirectorSetttingComponent } from "./general/DirectorComponent"
import { DecanoSettingsComponent } from "./general/DecanoSettingsComponent"

const decano = 'Jairo Andres Quintero Rodriguez'
const documento = '1234'

//TODO: Ajustar nombre
export const GeneralComponent = () => { 
  return (<>
    <div className="px-10">
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-base font-medium leading-6 text-gray-900">Decano</dt>
            <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <DecanoSettingsComponent decano={{ nombre: decano,documento }} />
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-base font-medium leading-6 text-gray-900">Cuenta del director del programa</dt>
            <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <DirectorSetttingComponent/>
            </dd>
          </div>
          
         
          </dl>
        
      </div>
    </div>
  </>)
}

/**
 *  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-base font-medium leading-6 text-gray-900">Formato del convenio</dt>
            <dd className="mt-1 text-base leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <ConvenioFileSettingComponent/>
            </dd>
          </div>
 */