import { HiOutlineFolderPlus, HiOutlineUserPlus } from 'react-icons/hi2';
import { Button } from '../../components/ui';

interface EmptyStateMessageProps { 
  message?: string;
  submesage?: string;
  buttonText?: string;
  showButton?:boolean

  setOpen: (open: boolean) => void;

}

export const EmptyStateMessage = ({
  message = 'No hay estudiantes matriculados actualmente',
  submesage = 'Comienza agregando los estudiantes al semestre',
  buttonText = 'Agregar estudiantes',
  showButton = true,
  setOpen
}: EmptyStateMessageProps) => {

  
  return (
    <>
      <div className="flex flex-col min-h-96 justify-center items-center">
        <div className="text-center">
          <HiOutlineFolderPlus className="size-16 text-gray-400 mx-auto" />
          <h3 className="text-sm text-gray-900 font-semibold mt-2">
            {message}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
           {submesage}
          </p>
          {
            showButton &&
            <>
              <input className="hidden" type="file" />
              <Button className="mt-9 items-center" onClick={() => setOpen(true)}>
                <HiOutlineUserPlus className="size-5 mr-2" />
                {buttonText}
              </Button>
            </>
}
          
        </div>
      </div>

    </>
  );
};
//<DialogBox isOpen={isOpen} onClose={closeDialog} />
//
