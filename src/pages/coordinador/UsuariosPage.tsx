import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { fetchGetUsuarios } from '../../api/usuario.api';
import { Usuario } from '../../interfaces';
import { Avatar, Pagination } from '../../components/ui';

export const UsuariosPage = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0); // Número total de ítems
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5); // Suponiendo que el backend maneja 10 ítems por página
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = parseInt(query.get('page') || '1', 10);

    const fetchData = async (pageToFetch: number) => {
      const response = {data: [], total: 0} // await fetchGetUsuarios(pageToFetch, itemsPerPage);
      setUsuarios(response.data);
      setTotalItems(response.total);
      const totalPages = Math.ceil(response.total / itemsPerPage);

      // Validar la página solicitada
      if (pageToFetch < 1 || pageToFetch > totalPages) {
        const validPage = Math.min(Math.max(pageToFetch, 1), totalPages);
        navigate(`?page=${validPage}`, { replace: true });
      } else {
        setCurrentPage(pageToFetch);
      }
    };

    fetchData(page);
  }, [location.search, itemsPerPage, navigate]);

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(totalItems / itemsPerPage)) return;
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`);
  };

  return (
    <>
      <div className="mb-10">
        <div className="text-gray-600 font-bold text-2xl">
          Usuarios
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full border-gray-300">
          <thead>
            <tr>
              <th className="min-w-[28rem] text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Nombre</th>
              <th className="min-w-36 text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Fecha creación</th>
              <th className="min-w-24 text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Estado</th>
              <th className="min-w-32 text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Email</th>
              <th className="w-36 text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5">Roles</th>
            </tr>
          </thead>
          <tbody className="border-gray-300 divide-y border-y">
          {
              usuarios.map((usuario) => (
                <tr key={usuario.id} className="cursor-pointer">
                  <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                    <div className="flex items-center">
                      <div className="shrink-0 w-11 h-11">
                        <Avatar url={usuario.imagenUrl} />
                      </div>
                      <div className="ml-4">
                        <div className="text-gray-900 font-medium">{ usuario.displayName || 'Nombre aun no registrado' }</div>
                        <div className="text-gray-500 mt-1">{ usuario.email }</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm whitespace-nowrap capitalize text-gray-500">{ new Date(usuario.fechaCreacion).toLocaleDateString() }</td>
                  <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                    {
                      usuario.estaActivo 
                      ? <span className="text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">Activo</span>
                      : <span className="text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">Inactivo</span>
                    }
                  </td>
                  <td className="text-sm whitespace-nowrap pl-0 pr-3 py-5">
                  {
                      usuario.emailConfirmado 
                      ? <span className="text-green-700 font-medium text-xs py-1 px-2 ring-1 ring-green-600/20 bg-green-100 rounded-md items-center inline-flex border-green-600 ring-inset">Confirmado</span>
                      : <span className="text-red-700 font-medium text-xs py-1 px-2 ring-1 ring-red-600/20 bg-red-100 rounded-md items-center inline-flex border-red-600 ring-inset">No confirmado</span>
                    }
                  </td>
                  <td className="flex gap-x-1.5 flex-wrap items-center text-sm capitalize text-gray-500 pl-0 pr-3 py-5">
                    {
                      usuario.roles.map((rol, index) => (
                        <span key={index}>
                          {rol.nombre}
                          {index !== usuario.roles.length - 1 && ', '}
                        </span>
                      ))
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} totalItems={totalItems} paginate={paginate} />
    </>
  );
}
