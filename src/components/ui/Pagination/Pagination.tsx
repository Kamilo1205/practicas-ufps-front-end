import { FC } from 'react';
import { HiMiniArrowLongLeft, HiMiniArrowLongRight } from 'react-icons/hi2';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ currentPage = 1, itemsPerPage = 10, totalItems = 11, paginate }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPaginationGroup = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const sidePages = Math.floor((maxVisiblePages - 3) / 2); // Pages around current page
      if (currentPage <= sidePages + 3) {
        for (let i = 1; i <= sidePages + 3; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - sidePages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - sidePages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - sidePages + 1; i <= currentPage + sidePages - 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="py-8 sm:px-6 mx-auto max-w-7xl">
      {totalItems > 0 && 
        <nav className="flex items-center sm:justify-center justify-between px-4 sm:px-0">
          <div className="flex -mt-0.5">
            <button
              className="inline-flex select-none font-medium text-sm text-gray-500 py-3 pr-1 items-center"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <HiMiniArrowLongLeft className="w-5 h-5 mr-3"/>
              Anterior
            </button>
          </div>
          <div className="hidden sm:flex mx-6">
            {
              getPaginationGroup().map((item, index) => (
                <button
                  key={index}
                  className={`inline-flex select-none items-center text-sm font-medium py-3 px-4 ${
                    currentPage === item ? 'text-blue-600 bg-gray-200/50' : 'text-gray-500'
                  }`}
                  onClick={() => typeof item === 'number' && paginate(item)}
                >
                  {item}
                </button>
              ))
            }
          </div>
          <div className="flex -mt-0.5">
            <button
              className="inline-flex select-none font-medium text-sm text-gray-500 py-3 pr-1 items-center"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <HiMiniArrowLongRight className="w-5 h-5 ml-3"/>
            </button>
          </div>
        </nav>
      }
    </div>
  );
};
