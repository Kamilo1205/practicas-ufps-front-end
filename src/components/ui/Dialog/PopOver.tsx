import { useRef, useEffect, FC, useState } from "react";
import { Comment } from "../../PlanDeTrabajo/Actividad/types";
import { IoClose } from "react-icons/io5";

interface PopoverProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  rol?: boolean;
  comment?: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}
const Popover: FC<PopoverProps> = ({
  isOpen,
  setIsOpen,
  rol = false,
  comment,
  setComments,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  const deleteItem = () => {
    setComments([]);
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

  const [rightPosition, setRightPosition] = useState(
    !rol ? "-275px" : "-220px"
  );
  const [pos, setPos] = useState("330px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Tailwind's sm breakpoint
        setRightPosition(!rol ? "-195px" : "-150px");
        setPos("165px");
      } else {
        setRightPosition(!rol ? "-275px" : "-220px");
        setPos("330px");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [rol]);

  return (
    <div className="relative flex justify-center items-center w-1 h-1 bg-gray p-4">
      <div
        ref={popoverRef}
        className={`absolute transform -translate-x-1/2  bg-white shadow-lg rounded-md p-4 border w-[200px] sm:w-[360px] border-gray-200 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          zIndex: 1000,
          bottom: "40px",
          right: rightPosition,
        }}
      >
        <div style={{ height: "170px" }}>
          <div
            className="h-full"
            style={{ width: pos, overflowY: "auto", overflowX: "hidden" }}
          >
            {comment?.length == 0 ? (
              <div
                className="w-full h-full flex justify-center text-gray-400"
                style={{ alignItems: "center" }}
              >
                <p>No hay Comentarios</p>
              </div>
            ) : (
              <>
                {comment?.map((c) => (
                  <div
                    style={{ borderRadius: "5px" }}
                    className="p-2 border mb-2 mr-1"
                  >
                    {!rol ? (
                      <div className="w-full flex justify-end text-red-500">
                        <button onClick={deleteItem}>
                          <IoClose />
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                    <p style={{ fontWeight: "bold" }}>{c.autor}</p>
                    <p style={{ fontWeight: "lighter" }}>{c.comentario}</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
