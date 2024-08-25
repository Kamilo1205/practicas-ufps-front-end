import { useEffect, useState } from "react"
import { actualizarDecanoApi, actualizarDirectorApi, getDecanoApi, getDirector, postDecanoApi, postDirectorApi } from "../api/general.api"
import { Decano } from "../interfaces/decano.interface"
import { Director } from "../interfaces/director.interface"
import Swal from "sweetalert2"


export const useGeneralConfig = () => { 

  const [decano, setDecano] = useState<Decano>({} as Decano)
  const [director, setDirector] = useState<Director>({} as Director)
  console.log(director)
  useEffect(() => {
    getDecanoApi().then((data) => { 
      setDecano(data)
    })
  getDirector().then((data) => { 
      setDirector(data)
    })
  }, [])
  
  const crearDirector = async (director: Director | Omit<Director,'id'>) => {
    if (director?.id) {
      console.log('actualizar')
      actualizarDirectorApi(director).then((data) => {
        setDirector(data)
        Swal.fire({
          title: 'Director actualizado correctamente',
          icon: 'success',
          showConfirmButton: true
        })
      }).catch((err) => console.log(err))
    }
    else {
      console.log('crear')
      postDirectorApi(director).then((data) => { 
        setDirector(data)
        Swal.fire({
          title: 'Director creado correctamente',
          icon: 'success',
          showConfirmButton: true
        })
      }, (err) => console.log(err))
    }
  }

  const actualizarDecano = async (decano: Decano) => {
try {
  if (decano?.id) { 
    actualizarDecanoApi(decano).then((data) => { 
      
      setDecano(decano)
      Swal.fire({
        title: 'Decano actualizado correctamente',
        icon: 'success',
        showConfirmButton: true
      })
    }).catch((err) => console.log(err))
  }
  else {
    postDecanoApi(decano).then((data) => { 
      console.log(data)
      setDecano(data)
      Swal.fire({
        title: 'Decano creado correctamente',
        icon: 'success',
        showConfirmButton: true
      })
    }).catch((err) => 
      Swal.fire({
        title: 'Error al crear el decano',
        icon: 'error',
        showConfirmButton: true
      })
    )
  }
} catch (error) {
  Swal.fire({
    title: 'Error al crear el decano',
    icon: 'error',
    showConfirmButton: true
  })
}
   }

  return {
    decano,
    director,
    crearDirector,
    actualizarDecano
  }
  
}