import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/Input/Form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "../../components/ui"
import { Button } from "@headlessui/react"
import useEmpresas from "../../hooks/useEmpresas"



export const RegistroDependencia = () => {
  const { registrarDependencia } = useEmpresas()
  const form = useForm({
    defaultValues: {
      nombre: '',
      nombrePersonaACargo: '',
      codigo: '',

    },
    resolver: zodResolver(z.object({
      nombre: z.string().min(1, 'El nombre de la dependencia es obligatorio').default(''),
      nombrePersonaACargo: z.string().min(1, 'El nombre de la persona a cargo es obligatorio').default(''),
      codigo: z.string().min(1, 'El código de la dependencia es obligatorio').default(''),
    }))
  })

  const onSubmit = (data: any) => {
    console.log(data)
    registrarDependencia(data)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* Nombre Legal */}
            <div className="sm:col-span-3">
              <FormField
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la dependencia</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Nombre Legal */}
            <div className="sm:col-span-3">
              <FormField
                name="nombrePersonaACargo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la persona a cargo</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Nombre Legal */}
            <div className="sm:col-span-3">
              <FormField
                name="codigo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button type="submit" className={'bg-indigo-600 p-2 rounded-md text-white'}>
              Guardar
            </Button>
          </div>
        </form>
      </Form>

    </div>
  )
}