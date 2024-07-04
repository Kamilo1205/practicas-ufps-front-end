import { useEffect, useState } from "react"
import { Docente } from "../interfaces/doncente.interface"
import { getDocentesApi } from "../api/docentes.api"


export const useDocentes = () => {
  
  const [docentes, setDocentes] = useState<Docente>()
  

  useEffect(() => {
    getDocentesApi().then(resp => {
      setDocentes(resp)
    }
    )
  }, [])

  return {
    docentes
  }
}