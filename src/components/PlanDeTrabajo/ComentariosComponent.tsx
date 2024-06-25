import { useState } from "react";
import Popover from "./../ui/Dialog/PopOver";
import { FaRegCommentDots } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { DialogComponent } from "./../ui/Dialog/DialogComponent";
import { TextArea } from "../ui";

const ComentariosComponent = () => {
  const [OpenView, setOpenView] = useState(false);
  const [OpenAdd, setOpenAdd] = useState(false);
  return (
    <div className="flex">
      <Popover isOpen={OpenView} setIsOpen={setOpenView} />
      <DialogComponent
        isOpen={OpenAdd}
        title="Añadir Comentario"
        onClose={() => setOpenAdd(false)}
        content={<TextArea rows={3}/>}
        size="md"
      />
      <div className="flex" style={{ alignItems: "center" }}>
        <button
          className="bg-blue-500 text-white px-3 py-3 mr-2"
          style={{ borderRadius: "10px" }}
          onClick={() => setOpenAdd(true)}
        >
          <FaRegCommentDots style={{ width: "20px", height: "20px" }} />
        </button>
      </div>

      <div>
        <button
          className="bg-gray-500 text-white px-3 py-3"
          style={{ borderRadius: "10px" }}
          onClick={() => setOpenView(true)}
        >
          <BiShowAlt style={{ width: "20px", height: "20px" }} />
        </button>
      </div>
    </div>
  );
};

export default ComentariosComponent;
