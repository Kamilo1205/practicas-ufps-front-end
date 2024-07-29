import { useEffect, useState } from "react"
import { fetchSemestreApi, updateSemestreApi } from "../api/semestre.api"
import { Semestre } from "../schemas/semestreSchema"
import Swal from "sweetalert2"


export const useSemestre = () => {
  const [semestre, setSemestre] = useState<Semestre>()
  const [loading, setLoading] = useState(false)


  const guardarCambiosDeFechas = async (semestre: Semestre) => {
    try {
      await updateSemestreApi(semestre)
      setSemestre(semestre)
      Swal.fire({
        icon: 'success',
        title: '¡Listo!',
        text: 'Fechas del semestre actualizadas'
      })
    }
    catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se pudo actualizar las fechas del semestre'
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchSemestreApi().then(resp => {
      setSemestre(resp)
      //console.log(resp)
      setLoading(false)
    }
    )

  }, [])

  return {
    semestre,
    loading,
    guardarCambiosDeFechas
  }

}