import { useForm } from "react-hook-form"
import Title from "../../components/ui/Tittle/Title"


export const SolicitudCambio = () => {
  const form = useForm()
  const onSubmmit = () => {

  }
  return <>
    <Title
      titulo="Solicitud de cambio"
    />

    <form className="flex flex-col flex-wrap space-y-3" action="">

      <div className="flex flex-col">
        <label htmlFor="" className="font-semibold">
          Motivo de la solicitud
        </label>
        <input
          className="rounded-md"
          type="text"

        />


      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="font-semibold">
          Documento de la solicitud

        </label>
        <label className="font-light mb-3" htmlFor="">Adjunte la carta de solicitud de cambio en formato pdf.</label>
        <input type="file" name="" id="" />
      </div>

      <div>

        <input
          className="text-white bg-indigo-500 rounded-md p-2"
          type="submit" value="Enviar" title="" />
      </div>
    </form>
  </>
}