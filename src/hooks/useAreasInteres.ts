import { useState, useCallback, useEffect } from 'react';
import { AxiosError } from 'axios';
import { fetchAreasDeInteres as fetchAreasDeInteresAPI, fetchSubareasByArea as fetchSubareasPorAreaAPI, fetchAreaDeInteresById as fetchAreaDeInteresByIdAPI, createAreaDeInteres as createAreaDeInteresAPI, updateAreaDeInteres as updateAreaDeInteresAPI, deleteAreaDeInteres as deleteAreaDeInteresAPI, createHerramientaApi } from '../api/areasInteres.api';
import { AreaInteres } from '../interfaces';
import Swal from 'sweetalert2';
import { Herramienta } from '../interfaces/herramienta.interface';


type UseAreasDeInteresReturn = {
  areas: AreaInteres[];
  cargando: boolean;
  error: AxiosError | null;
  fetchAreasDeInteres: () => Promise<void>;
  fetchSubareasByArea: (areaId: string) => Promise<void>;
  fetchAreaDeInteresById: (id: string) => Promise<AreaInteres | null>;
  createAreaDeInteres: (newArea: Omit<AreaInteres, 'id'>) => Promise<void>;
  updateAreaDeInteres: (id: string, updatedArea: Omit<AreaInteres, 'id'>) => Promise<void>;
  deleteAreaDeInteres: (id: string) => Promise<void>;
  createHerramienta: (areaId: string, herramienta: Omit<Herramienta, 'id'>) => Promise<void>;
};

const useAreasDeInteres = (): UseAreasDeInteresReturn => {
  const [areas, setAreas] = useState<AreaInteres[]>([]);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchAreasDeInteres = useCallback(async () => {
    setCargando(true);
    try {
      const data = await fetchAreasDeInteresAPI();
      setAreas(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchSubareasByArea = useCallback(async (areaId: string) => {
    setCargando(true);
    try {
      const data = await fetchSubareasPorAreaAPI(areaId);
      setAreas(data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  }, []);

  const fetchAreaDeInteresById = async (id: string): Promise<AreaInteres | null> => {
    setCargando(true);
    try {
      const data = await fetchAreaDeInteresByIdAPI(id);
      setError(null);
      return data;
    } catch (err) {
      setError(err as AxiosError);
      return null;
    } finally {
      setCargando(false);
    }
  };

  /**
   * 
   * @param newArea Area de interés a crear. El areaPadre se manda como string.
   */
  const createAreaDeInteres = async (newArea: Omit<AreaInteres, 'id'>) => {
    setCargando(true);
    try {
      const data = await createAreaDeInteresAPI(newArea);
      //Crea el area sin actualiza refrescar la página.
      setAreas((prev) => [data, ...prev]);
      //Cuando la nueva area es una subarea es necesario agregarla también en el area padre para que se renderise sin refrescar la pg.
      const padre = areas.find((area) => area.id === newArea.areaPadre);
      if (padre) {
        //Si encuentra un area es porque existe un padre, es decir se trata de una sub area, por lo tanto hay que actualizar el area padre. 
        setAreas((prev) => prev.map((area) => {
          if (area.id === padre.id) {
            return {
              ...area,
              subAreas: [...area.subAreas, data]
            }
          }
          return area
        }))
      }
      Swal.fire({
        icon: 'success',
        title: 'Area de interés creada',
        showConfirmButton: true,
        timer: 1500
      })
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const updateAreaDeInteres = async (id: string, updatedArea: Omit<AreaInteres, 'id'>) => {
    setCargando(true);
    try {
      const data = await updateAreaDeInteresAPI(id, updatedArea);
      Swal.fire({
        icon: 'success',
        title: 'Area de interés actualizada',
        showConfirmButton: false,
        timer: 150
      }).then(() => {
        setAreas((prev) =>
          prev.map((area) => (area.id === id ? data : area))
        );
        setError(null);

      })
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el area de interés',
        showConfirmButton: false,
        timer: 150
      })
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };

  const deleteAreaDeInteres = async (id: string) => {
    setCargando(true);
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'No podrás revertir esta acción',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log(id)
          await deleteAreaDeInteresAPI(id)
          setAreas((prev) => prev.filter((area) => area.id !== id));
          Swal.fire(
            'Eliminado',
            'El area de interes ha sido eliminada',
            'success'
          )
          setError(null);
        }
      }).catch((err) => { 
        setError(err as AxiosError);
      });
      
      
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setCargando(false);
    }
  };
  /**
   * Agrega la herramienta a la subArea de interes. Actuliza el estado de las areas de interes con la nueva herramienta.
   * @param areaId Id de la subArea a la que se le va a agregar la herramienta.
   * @param herramienta Herramienta a agregar.
   */
  const createHerramienta = async (areaId: string, herramienta: Omit<Herramienta, 'id'>) => {
    setCargando(true);
    try {
      const herramientaCreada = await createHerramientaApi(areaId, herramienta);
      Swal.fire({
        icon: 'success',
        title: 'Herramienta creada',
        showConfirmButton: false,
        showCloseButton: true,
      })
      //Se actuliza la subArea con la nueva herramienta.
      setAreas((prev) => prev.map((area) => {
        if (area.id === areaId) {
          return {
            ...area,
            herramientas: [...area.areaInteresHerramientas, herramientaCreada]
          }
        }
        return area
      }))
      //Ahora debo buscar el area padre de la subarea que contiene la herramienta creada.
      const padre = areas.find((area) => area.subAreas?.find((subArea) => subArea.id === areaId));
      console.log('padre encontrado.',padre)
      //Ahora se debe actualizar el area padre con la nueva herramienta. Esto permite que los cambios se hagan sin localmente sin refrescar la pg.
      setAreas((prev) => prev.map((area) => { 
        if (padre && typeof herramientaCreada.areaInteres?.areaPadre !== 'string'
          && padre.id === herramientaCreada.areaInteres?.areaPadre?.id
        ) {
          return {
            ...area,
            areaInteresHerramientas: [...area.areaInteresHerramientas, herramientaCreada],
            subAreas: area.subAreas?.map((subArea) => {
              if (subArea.id === areaId) {
                return {
                  ...subArea,
                  areaInteresHerramientas: [...subArea.areaInteresHerramientas, herramientaCreada]
                }
              }
              return subArea
            
            })
          }
        }
        return area
      
      }))
      setError(null);

    } catch (err) {
      setError(err as AxiosError);
      
    } finally {
      setCargando(false);
    }
  }
  useEffect(() => {
    fetchAreasDeInteres();
  }, [fetchAreasDeInteres]);

    return {
      areas, cargando, error,
      fetchAreasDeInteres,
      fetchSubareasByArea,
      fetchAreaDeInteresById,
      createAreaDeInteres,
      updateAreaDeInteres,
      deleteAreaDeInteres,
      createHerramienta,
    };
};

export default useAreasDeInteres;
