import {  useState } from "react";
import { TabComponent } from "../../components/ui/Tab/TabComponent"

import { DocentesYCursosSettingComponent } from "../../components/settings/DocentesYCursosSettingComponent";
import { AreasDeInteresSettingComponent } from "../../components/settings/AreasDeInteresSettingComponent";
import { GeneralComponent } from "../../components/settings/GeneralComponent";


const Tabs = [
  {
    name:'Grupos y docentes de practicas'
},
  {
    name:'Areas de Interes',
  },
  {
    name:'General'
  }
]


/*
interface GrupoI {
  id: string;
  nombre: string;
  docente: DocenteI | null;

}
*/
export const ConfiguracionesPage = () => { 
  const [tab, setTab] = useState(0);
  
  return (<>
    <div className="mb-10">
      <div className="text-gray-600 font-bold text-2xl mb-3">Configuraciones</div>
    </div>
    <>
      <TabComponent
        activeTab={tab}
        setTab={setTab}
        tabListI={Tabs}
      />
      {
        tab === 0 && (
         <DocentesYCursosSettingComponent/>
          
        )
      }
      {
        tab === 1 && (
          <AreasDeInteresSettingComponent />
        )
      }{
        tab === 2 && (
          <GeneralComponent/>
        )
      }
    </>
  </>)
}

