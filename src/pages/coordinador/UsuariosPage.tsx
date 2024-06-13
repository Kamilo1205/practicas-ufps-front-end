import { FC, useEffect, useMemo, useState } from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, SortingState } from '@tanstack/react-table';
import { Avatar, Input, Pagination } from '../../components/ui';
import useUsuarios from '../../hooks/useUsuarios';
import { Usuario } from '../../interfaces';
import { HiMiniArrowsUpDown, HiMiniBarsArrowDown, HiMiniBarsArrowUp } from 'react-icons/hi2';
import { Badge } from '../../components/ui/Badge/Badge';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "displayName",
    header: "Nombre",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="shrink-0 w-11 h-11">
          {
            row.original.imagenUrl 
              ? <Avatar url={row.original.imagenUrl} />
              : <Avatar />
          }
        </div>
        <div className="ml-4">
          <div className="text-gray-900 font-medium">{ row.original.displayName || 'Nombre aun no registrado' }</div>
          <div className="text-gray-500 mt-1">{ row.original.email }</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "fechaCreacion",
    header: "Fecha de Registro",
    cell: ({ row }) => { 
      return new Date(row.original.fechaCreacion).toLocaleDateString() 
    },
  },
  {
    accessorKey: "estaActivo",
    header: "Activo",
    cell: ({ row }) => (
      <div>
        { 
          row.original.estaActivo 
            ? <Badge variant="green">Activo</Badge>  
            : <Badge variant="red">Inactivo</Badge>
        }
      </div>
    ),
  },
  {
    accessorKey: "emailConfirmado",
    header: "Email Confirmado",
    cell: ({ row }) => (
      <div>{ 
        row.original.emailConfirmado 
          ? <Badge variant="green">Confirmado</Badge>  
          : <Badge variant="red">No Confirmado</Badge>
        }
      </div>
    ),
  },
  {
    accessorKey: "roles",
    header: "roles",
    enableSorting: false,
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-x-2 gap-y-3">
        { 
          row.original.roles?.map((rol) => (
            <Badge key={rol.id}>{ rol.nombre }</Badge>
          )) 
        }
      </div>
    ),
  },
];

export const UsuariosPage: FC = () => {
  const { usuarios, total, loading, fetchUsuarios } = useUsuarios();
  const [pagination, setPagination] = useState({
    pageIndex: 1,
    pageSize: 10,
  });
  const [ sorting, setSorting ] = useState<SortingState>([]);
  const [ search, setSearch ] = useState('');

  // Configura React Table
  const table = useReactTable({
    data: usuarios,
    columns,
    rowCount: total,
    state: {
      pagination,
      sorting,
    },
    manualSorting: true,
    enableMultiSort: true,
    onSortingChange: setSorting,
    maxMultiSortColCount: 2,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  const {
    getHeaderGroups,
    getRowModel,
    getState,
  } = table;
  const { pageIndex, pageSize } = getState().pagination;

  useEffect(() => {
    fetchUsuarios({ page: pageIndex, limit: pageSize, sort: sorting, search });
  }, [fetchUsuarios, pageIndex, pageSize, sorting, search]);
  console.log(search);


  return (
    <div>
      <div className="mb-5">
        <h1 className="text-gray-600 font-bold text-2xl">Usuarios</h1>
      </div>

      <div className="flex sm:justify-end mb-8">
        <Input 
          type="text"
          className="w-80 sm:w-96" 
          value={search}
          placeholder="Buscar..." 
          onChange={(e) => setSearch(e.target.value)}/>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              {getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="cursor-pointer select-none text-gray-900 font-semibold text-sm text-left pl-0 pr-3 py-3.5"
                      key={header.id}
                      onClick={
                        header.column.getCanSort()
                            ? () => header.column.toggleSorting(undefined, true)
                            : undefined
                        }
                    >
                      {
                        header.isPlaceholder
                          ? null
                          : (<div className="flex gap-x-3 items-center">
                              {
                                flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                              {
                                header.column.getCanSort() && (
                                  {
                                    asc: <HiMiniBarsArrowUp className="size-4"/>,
                                    desc: <HiMiniBarsArrowDown className="size-4"/>,
                                  }[header.column.getIsSorted() as string] ?? <HiMiniArrowsUpDown className="size-4"/>
                                )
                              }
                            </div>
                          )
                      }  
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="border-gray-300 divide-y border-y">
              {getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td className="text-sm whitespace-nowrap pl-0 pr-3 py-3.5" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={pageIndex}
          itemsPerPage={pageSize}
          totalItems={total}
          paginate={(page) => setPagination({ ...pagination, pageIndex: page })}
        />
      </div>
    </div>
  );
};
