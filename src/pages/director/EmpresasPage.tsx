
import Title from "../../components/ui/Tittle/Title"
import { useState } from "react"
import { EmpresaPage } from "../coordinador/EmpresasPage"
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"
import { BiCheck, BiChevronDown } from "react-icons/bi"
import clsx from "clsx"

const empresas = [
  {
    id: 1,
    name: 'Empresa 1',
    ruc: '123456789',
    email: '',
  }
]

export const DirectorEmpresasPage = () => {
  const [filtro, setFiltro] = useState('')
  const [selected, setSelected] = useState(null)

  const empresasFiltradas = empresas.filter((empresa) => {
    return empresa.name.toLowerCase().includes(filtro.toLowerCase())
   })
console.log(empresasFiltradas)
  return (
    <>
      <Title titulo="Empresas" />

      <div>
        <h1>Regitrar convenio</h1>

        <div className="w-80">
          <label htmlFor="empresa">Empresa</label>
         
          <Combobox
            value={selected} onChange={(value) => setSelected(value)} onClose={() => setFiltro('')}
          >
            <div className="relative">
              <ComboboxInput
                className={clsx(
                  'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-back',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )}
                displayValue={(empresa) => empresa?.name}
                onChange={(event) => setFiltro(event.target.value)}
              />
              <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                <BiChevronDown className="size-4 fill-black/60 group-data-[hover]:fill-black" />
              </ComboboxButton>
            </div>

            <ComboboxOptions
              anchor="bottom"
              className={clsx(
                'w-[var(--input-width)] rounded-xl border border-gray-800/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
              )}
            >
              {
                empresasFiltradas.map((empresa) => (
                  <ComboboxOption key={empresa.id} value={empresa}
                    className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-indigo-400"
                  >
                    <BiCheck className="invisible size-4 fill-black group-data-[focus]:fill-white group-data-[selected]:visible" />
                    <div className="text-sm/6 text-black group-data-[focus]:text-white">{empresa.name}</div>
                  </ComboboxOption>
                ))
}
              </ComboboxOptions>
          </Combobox>
        </div>

      </div>
      <EmpresaPage  />
    </>
  )
}

/**
 *  <div className="relative mt-2 w-fit">
            <div className="flex">
              <div className="w-fit flex content-center">
                <div className="relative mt-2 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">
                      <LuSearchCheck />
                    </span>
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Busqueda global" />

                </div>
               
                  <ul className="absolute top-11 z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" tabIndex={-1} role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
                    <li className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="listbox-option-0" role="option">
                      <span className="ml-3 block truncate font-normal">Wade Cooper</span>
                    </li>
                  </ul>
                
              </div>
            </div>
          </div>
 */