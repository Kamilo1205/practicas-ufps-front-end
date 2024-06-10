import { useState } from 'react';
import { HiOutlineFolderPlus, HiOutlineUserPlus } from 'react-icons/hi2';
import { DialogBox } from './DialogoBox';
import { Button } from '../../components/ui';

export const EmptyStateMessage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  return (
    <>
      <div className="flex flex-col min-h-96 justify-center items-center">
        <div className="text-center">
          <HiOutlineFolderPlus className="size-16 text-gray-400 mx-auto" />
          <h3 className="text-sm text-gray-900 font-semibold mt-2">
            No hay estudiantes matriculados actualmente
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Comienza agregando los estudiantes al semestre
          </p>

          <input className="hidden" type="file" />
          <Button className="mt-9 items-center" onClick={openDialog}>
            <HiOutlineUserPlus className="size-5 mr-2" />
            Agregar estudiantes
          </Button>
        </div>
      </div>

      <DialogBox isOpen={isOpen} onClose={closeDialog} />
    </>
  );
};