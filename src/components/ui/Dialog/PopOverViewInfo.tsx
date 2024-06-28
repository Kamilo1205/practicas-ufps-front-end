import { useRef, useEffect, FC, useState } from "react";

interface PopoverProps {
  OpenView: boolean;
  setOpenView: (OpenView: boolean) => void;
  rol: boolean;
  content: JSX.Element;
}
const PopOverViewInfo: FC<PopoverProps> = ({
  OpenView,
  setOpenView,
  rol,
  content,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpenView(false);
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
  const [pos, setPos] = useState("100px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // Tailwind's sm breakpoint
        setRightPosition(!rol ? "-90px" : "-90px");
        setPos("100px");
      } else {
        setRightPosition(!rol ? "-130px" : "-130px");
        setPos("200px");
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
        className={`absolute transform -translate-x-1/2  bg-white shadow-lg rounded-md p-4 border sm:w-[222px] w-[135px] border-gray-200 transition-opacity duration-300 ease-in-out ${
          OpenView ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{
          zIndex: 1000,
          bottom: "30px",
          right: rightPosition,
        }}
      >
        <div
          className="h-full"
          style={{ width: pos, overflowY: "auto", overflowX: "hidden" }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default PopOverViewInfo;
