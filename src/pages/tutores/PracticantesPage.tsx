import { useState } from "react"
import { EmptyStateMessage } from "../../components/estudiantes"



export const PracticantesPage = () => { 

  const [practicantes,setPracticantes] = useState<any[]>([])

  return (<>
    <div className="mb-10">
      <div className="text-gray-600 font-bold text-2xl">Practicantes asignados</div>
    </div>
    {
      practicantes.length === 0 ? (
        <EmptyStateMessage
          message="No hay practicantes asignados"
          submesage=""
          buttonText=""
          showButton={false}
          setOpen={()=>{}}
        />
      ) : 
        (
          <></>
        )
    }
  </>)
}