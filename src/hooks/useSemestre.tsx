import { useEffect, useState } from "react"
import { fetchSemestreApi } from "../api/semestre.api"
import { Semestre } from "../schemas/semestreSchema"


export const useSemestre = () => {
  const [semestre, setSemestre] = useState<Semestre>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetchSemestreApi().then(resp => {
      setSemestre(resp)
      console.log(resp)
      setLoading(false)
    }
    )

  }, [])

  return {
    semestre,
    loading
  }

}