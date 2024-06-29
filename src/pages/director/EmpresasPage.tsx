
import Title from "../../components/ui/Tittle/Title"
import { useEffect, useState } from "react"
import {  Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react"
import { BiCheck, BiChevronDown } from "react-icons/bi"
import clsx from "clsx"
import { Empresa } from "../../interfaces"
import { TablaPaginadaComponent } from "../../components/ui/Table/TablaPaginadaComponent"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import useEmpresas from "../../hooks/useEmpresas"

interface ConvenioFormProps {
  empresa:Empresa

}
const ConvenioForm = ({ empresa }: ConvenioFormProps) => { 
  
  
  console.log(empresa)
  const form = useForm({
    resolver: zodResolver(z.object({
      convenio: z.instanceof(FileList)
    }))
  })

  console.log(form.formState.errors)
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-2">
      <input type="file"
        accept=".pdf, .doc, .docx"
        {...form.register('convenio')} />
      <button type="submit" className="text-indigo-500">
        Registrar
      </button>

    </form>
  )
}

export const DirectorEmpresasPage = () => {

  const { empresas } = useEmpresas()

  const [filtro, setFiltro] = useState('')
  const [selected, setSelected] = useState(null)
  const [empresasFiltradas, setEmpresasFiltradas] = useState<Empresa[]>(empresas)
  const [paginacion, setPaginacion] = useState({
    currentPage: 1,
    itemsPerPage: 5
  })
  
  
  
  useEffect(() => { 
    setEmpresasFiltradas(empresas.filter((empresa) => {
      return empresa.nombre.toLowerCase().includes(filtro.toLowerCase()) || empresa.nit.includes(filtro)
    }))
    }, [filtro,empresas])
 // const empresasFiltradas:Empresa[] = 
console.log(empresasFiltradas)
  return (
    <>
      <Title titulo="Empresas" />

      <div>
        <h1></h1>

        <div className="w-80">
          <label htmlFor="empresa">Regitrar convenio</label>
         
          <Combobox
            value={selected} onChange={(value) => setSelected(value)} onClose={() => setFiltro('')}
          >
            <div className="relative">
              <ComboboxInput
                className={clsx(
                  'w-full rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-back',
                  'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                )}
                displayValue={(empresa:Empresa) => empresa && `${empresa?.nit}-${empresa?.nombre}`}
                onChange={(event) => setFiltro(event.target.value)}
                placeholder="Nombre o nit de la empresa"
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
                empresasFiltradas.map((empresa:Empresa) => (
                  <ComboboxOption key={empresa.id} value={empresa}
                    className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-indigo-400"
                  >
                    <BiCheck className="invisible size-4 fill-black group-data-[focus]:fill-white group-data-[selected]:visible" />
                    <div className="text-sm/6 text-black group-data-[focus]:text-white">{ empresa.nit} - {empresa.nombre}</div>
                  </ComboboxOption>
                ))
}
              </ComboboxOptions>
          </Combobox>
        </div>

      </div>
      <div>
        <TablaPaginadaComponent
          
          encabezados={['Nombre', 'NIT', 'Registrar convenio']}
          itemsPerPage={paginacion.itemsPerPage}
          currentPage={paginacion.currentPage}
          setCurrentPage={(page) => setPaginacion({ ...paginacion, currentPage: page })}
          totalItems={empresasFiltradas.length || 0}
          filas={empresasFiltradas.map((empresa: Empresa) => ([
             empresa.nombre ,
            empresa.nit ,
            <>
              {
                empresa.convenioActivo ? (<div>
                  <BiCheck className="text-green-500 w-5 h-5" />
                </div>) :
                  <div>
                  <ConvenioForm empresa={empresa}/>
                    
                  </div>
              }
            </>,
            
          ]
          ))}
        /> 
       
      </div>
    </>
  )
}

