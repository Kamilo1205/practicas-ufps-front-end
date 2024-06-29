import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ComentariosComponent from "../../PlanDeTrabajo/ComentariosComponent";
import { Comment } from "../../PlanDeTrabajo/Actividad/types";

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  initialOpen?: boolean;
  rol?: boolean;
  isShow?: boolean;
  comments?: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isComment?: boolean;
  autor: string;
}

const Collapse: React.FC<CollapseProps> = ({
  title,
  children,
  initialOpen = false,
  rol = false,
  isShow = true,
  comments,
  setComments,
  isComment = true,
  autor,
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
      >
        <div className="px-4 mt-6 w-full mb-5">
          {children}
          {isComment ? (
            <div className="flex w-full justify-end mt-4 mb-4">
              <ComentariosComponent
                rol={rol}
                isShow={isShow}
                comments={comments}
                setComments={setComments}
                autor={autor}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collapse;
