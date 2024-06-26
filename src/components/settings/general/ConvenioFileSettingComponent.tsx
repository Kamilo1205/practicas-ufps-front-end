import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { fetchGetDocumentoConvenio } from "../../../api/documento.api";

const downloadDocumento = async () => {
  const response = await fetchGetDocumentoConvenio();
  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `convenio.docx`);

  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
};

export const ConvenioFileSettingComponent = () => { 

  const form = useForm({
    resolver: zodResolver(z.object({
      convenio: z.instanceof(FileList, {
        message: 'El convenio debe ser un archivo.'
        
      })
        .refine((filelist) => filelist.length > 0, { message: 'El archivo es requerido' })

      .refine((filelist) => filelist[0]?.size < 5000000, { message: 'El archivo no debe superar los 5mb' })
    }))
  }) 

  const [editar, setEditar] = useState({  
    convenio:false
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    setEditar({ convenio: false })
  }
  return (<>
    <div>
      <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
        {
          !editar.convenio ? (
            <div className="flex w-0 flex-1 items-center">
              <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clipRule="evenodd" />
              </svg>
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <button
                  onClick={downloadDocumento}
                ><span className="truncate font-medium text-indigo-600">convenio.docx</span></button>
                <span className="flex-shrink-0 text-gray-400">4.5mb</span>
              </div>
              <div className="ml-4 flex flex-col">
                <button
                  onClick={() => setEditar({ convenio: true })}
                  className="font-medium text-indigo-600 hover:text-indigo-500">Editar</button>

              </div>
            </div>
          ) :
            (<>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex space-x-2">
                <div>
                  <input
                    type="file"
                    accept=".docx, .doc"
                    className="block w-full rounded-md border-0 py-1.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6"
                    {...form.register('convenio')}
                  />
                  <div className="text-red-500 text-sm">
                    {form.formState.errors.convenio?.message?.toString()}
                  </div>
                </div>
                <button
                  type="submit"
                  className="h-fit py-1 text-white bg-green-500 hover:bg-green-700 px-2 rounded-md">
                  Guardar
                </button>
                <button
                  onClick={() => setEditar({ convenio: false })}
                  className="h-fit py-1 text-white bg-red-500 hover:bg-red-700 px-2 rounded-md">
                  Cancelar
                </button>
              </form>
            </>)
        }
        
      </li>
    </div>
  </>)
}