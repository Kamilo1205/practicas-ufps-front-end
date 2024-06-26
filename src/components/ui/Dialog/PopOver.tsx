import { useRef, useEffect, FC } from "react";

interface PopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  rol?: boolean;
}
const Popover: FC<PopoverProps> = ({ isOpen, setIsOpen, rol = false }) => {
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
        className={`absolute  transform -translate-x-1/2 w-64 bg-white shadow-lg rounded-md p-4 border border-gray-200 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          zIndex: 1000,
          bottom: "40px",
          right: !rol ? "-220px" : "-170px",
        }}
      >
        <div style={{ width: "300px", height: "400px" }}>
          <div
            style={{ width: "220px", borderRadius: "5px" }}
            className="p-2 border mb-2"
          >
            <p style={{ fontWeight: "bold" }}>Tutor</p>
            <p style={{ fontWeight: "lighter" }}>Comentario y descripcion</p>
          </div>
          <div
            style={{ width: "220px", borderRadius: "5px" }}
            className="p-2 border"
          >
            <p style={{ fontWeight: "bold" }}>Tutor</p>
            <p style={{ fontWeight: "lighter" }}>Comentario y descripcion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
