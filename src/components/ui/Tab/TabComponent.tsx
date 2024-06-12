

interface TabMenuProps { 
  name: string;

}

interface TabComponentProps { 
  tabList?: TabMenuProps[];
  tabListI: TabMenuProps[];
  activeTab?: number;
  setTab: (index: number) => void;
}

export const TabComponent = ({ tabListI,activeTab = 0, setTab }:TabComponentProps) => {
  
  return (
    <>
      <div className="border-b border-gray-300 border-opacity-100 mb-5 min-w-80">
        <nav className="flex justify-end -mb-px">
          {tabListI.map((tab, index) => (
            <button
              onClick={() => setTab(index)}
              key={index}
              className={`no-underline text-gray-600 text-sm font-semibold py-4 px-6 block border-b-2  ${activeTab === index ? 'border-indigo-600' :'border-transparent'} hover:border-gray-500 `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
 }