import { useState } from "react";

const Tab1 = () => { 
  return (<></>)
}

interface TabMenuProps { 
  name: string;
  component: JSX.Element;

}

const TabMenu = [
  {
    name: 'Activos',
    component: <Tab1 />
  },
  {
    name: 'Grupo A',
    component: <Tab1 />
  },
  {
    name: 'Grupo B',
    component: <Tab1 />
  },
  {
    name: 'Grupo C',
    component: <Tab1 />
  },
  {
    name: 'Todos',
    component: <Tab1 />
  }

]

interface TabComponentProps { 
  tabList?: TabMenuProps[];

}

export const TabComponent = ({ tabList }:TabComponentProps) => {

  const [tabListI, setTabList] = useState(tabList || TabMenu)
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className="border-b border-gray-300 border-opacity-100">
        <nav className="flex justify-end -mb-px">
          {tabListI.map((tab, index) => (
            <a
              key={index}
              href="#"
              className={`no-underline text-gray-600 text-sm font-semibold py-4 px-6 block border-b-2 border-transparent ${activeTab === index ? 'border-indigo-600':''} hover:border-gray-500 ${index === 0 ? 'border-blue-500' : ''}`}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
 }