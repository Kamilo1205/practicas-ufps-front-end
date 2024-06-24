import { Transition } from "@headlessui/react";
import { useState } from "react";
import { BiUserCircle } from "react-icons/bi";



interface SelectInputCI {
  id: string;
  name: string;
  imgUrl?: string;
}

interface SelectInputCProps {
  selectedDefault?: SelectInputCI;
  options: SelectInputCI[];

}

export const SelectInputC = ({ selectedDefault, options }: SelectInputCProps) => {
  const [selected, setSelected] = useState<SelectInputCI | null>(selectedDefault || null);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  //TODO: Implementar guardar nueva seleccion.

  const onSeleccionar = (index: number) => {
    setSelected(options[index]);
    setOpen(false);
  }

  return (
    <div className="flex space-x-1">
      <label id="listbox-label" className="block text-sm font-medium leading-6 text-gray-900"></label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          type="button" className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
          <span className="flex items-center">
            {
              selected && (
                
                  selected.imgUrl? (
                    <img className="h-5 w-5 rounded-full" src={selected.imgUrl} alt="foto de perfil" />
                  ) : (
                    <BiUserCircle className="h-5 w-5 rounded-full text-gray-300" />
                  )
                
              )
            }
            <span className="ml-3 block truncate">{selected ? selected?.name : 'Seleccione un docente'}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fillRule="evenodd" d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z" clipRule="evenodd" />
            </svg>
          </span>
        </button>
        <Transition
          show={open}
          enter=""
          enterFrom=""
          enterTo=""
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul
            onBlur={() => setOpen(false)}

            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex={-1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">

            {
              options.map((option, index) => (
                <li
                  id={`op-${index}-${option.id}`} role="option"
                  key={`opkey-${index}-${option.id}`}
                  className={`relative cursor-default select-none py-2 pl-3 pr-9 ${highlightedIndex === index ? 'bg-indigo-600 text-white' : 'text-gray-900'
                    }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onMouseLeave={() => setHighlightedIndex(null)}
                  onClick={() => onSeleccionar(index)}
                >
                  <div className="flex items-center">
                    {
                      option.imgUrl ? (
                        <img className="h-5 w-5 rounded-full" src={option.imgUrl} alt="foto de perfil" />
                      ) : (
                        <BiUserCircle className="h-5 w-5 rounded-full text-gray-300" />
                      )
                    }
                    <span className={`ml-3 block truncate ${highlightedIndex === index ? 'font-semibold' : 'font-normal'}`}>{option.name}</span>
                  </div>

                  {
                    selected && selected.id === options[index].id && (
                      <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${highlightedIndex === index ? 'text-white' : 'text-indigo-600'}`}>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )
                  }
                </li>
              ))
            }

          </ul>
        </Transition>
      </div>

    </div>

  )
}