import { useRef, useEffect, FC } from "react";

interface PopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const Popover: FC<PopoverProps> = ({ isOpen, setIsOpen }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex justify-center items-center w-1 h-1 bg-gray p-4">
      <div
        ref={popoverRef}
        className={`absolute left-200 transform -translate-x-1/2 w-64 bg-white shadow-lg rounded-md p-4 border border-gray-200 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ zIndex: 1000, bottom: "70px" }}
      >
        <p className="text-gray-700">
          Este es un popover con una transición de desvanecido.
        </p>
      </div>
    </div>
  );
};

export default Popover;
