import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  initialOpen?: boolean;
}

const Collapse: React.FC<CollapseProps> = ({
  title,
  children,
  initialOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={toggleCollapse}
        className={`w-full flex justify-between items-center p-3 text-left text-lg cursor-pointer transition-colors duration-700 ${
          isOpen ? "bg-gray-100" : "hover:bg-gray-100"
        }`}
      >
        {title}
        <span
          className={`transform transition-transform duration-500 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? <BiChevronUp /> : <BiChevronDown />}
        </span>
      </button>
      <div
        className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-full opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ maxHeight: isOpen ? "1000px" : "0px" }}
      >
        <div className="px-4 mt-6 w-full"> {children}</div>
      </div>
    </div>
  );
};

export default Collapse;
