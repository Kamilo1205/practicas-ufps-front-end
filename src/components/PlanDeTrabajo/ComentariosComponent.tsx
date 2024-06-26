import { FC, useState } from "react";
import Popover from "./../ui/Dialog/PopOver";
import { FaRegCommentDots } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { DialogComponent } from "./../ui/Dialog/DialogComponent";
import { RiEyeCloseFill } from "react-icons/ri";
import { TextArea } from "../ui";
interface ComentariosProps {
  rol?: boolean;
  isShow?: boolean;
}
const ComentariosComponent: FC<ComentariosProps> = ({
  rol = false,
  isShow,
}) => {
  const [OpenView, setOpenView] = useState(false);
  const [OpenAdd, setOpenAdd] = useState(false);
  return (
    <div className="flex" style={{display:isShow ? "" : "none"}}>
      <Popover isOpen={OpenView} setIsOpen={setOpenView} rol={rol} />
      <DialogComponent
        isOpen={OpenAdd}
        title="Añadir Comentario"
        onClose={() => setOpenAdd(false)}
        content={<TextArea rows={3} />}
        size="md"
      />
      <div className="flex" style={{ alignItems: "center" }}>
        <button
          className="bg-blue-500 text-white px-3 py-3 mr-2 cursor-pointer 
             hover:scale-105 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out"
          style={{ borderRadius: "10px", display: rol ? "none" : "block" }}
          onClick={() => setOpenAdd(true)}
        >
          <FaRegCommentDots style={{ width: "20px", height: "20px" }} />
        </button>
      </div>

      <div>
        <button
          className=" text-white px-3 py-3 cursor-pointer 
             hover:scale-105 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out"
          style={{
            borderRadius: "10px",
            background: OpenView ? "rgb(67,67,67)" : "gray",
          }}
          onClick={() => setOpenView(true)}
        >
          {OpenView ? (
            <RiEyeCloseFill style={{ width: "20px", height: "20px" }} />
          ) : (
            <BiShowAlt style={{ width: "20px", height: "20px" }} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ComentariosComponent;
