import { useEffect, useState } from "react"
import { getDecanoApi } from "../api/general.api"
import { Decano } from "../interfaces/decano.interface"


export const useGeneralConfig = () => { 

  const [decano, setDecano] = useState<Decano>({} as Decano)

  useEffect(() => {
    getDecanoApi().then((data) => { 
      setDecano(data)
    })
   },[])
 
  return {
    decano
  }
  
}