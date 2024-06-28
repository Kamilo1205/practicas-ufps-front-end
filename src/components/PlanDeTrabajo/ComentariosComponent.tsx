import { FC, useState, useEffect } from "react";
import Popover from "./../ui/Dialog/PopOver";
import { FaRegCommentDots } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { DialogComponent } from "./../ui/Dialog/DialogComponent";
import { RiEyeCloseFill } from "react-icons/ri";
import { TextArea } from "../ui";
import { Comment } from "./Actividad/types";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

interface ComentariosProps {
  rol?: boolean;
  isShow?: boolean;
  comments?: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  autor: string;
}

const ComentariosComponent: FC<ComentariosProps> = ({
  rol = false,
  isShow,
  comments = [],
  setComments,
  autor,
}) => {
  const [OpenView, setOpenView] = useState(false);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [commentContent, setCommentContent] = useState(
    comments.length > 0 ? comments[0].comentario : ""
  );

  useEffect(() => {
    if (comments.length > 0) {
      setCommentContent(comments[0].comentario);
    } else {
      setCommentContent("");
    }
  }, [comments]);

  const handleSaveComment = () => {
    if (comments.length === 0) {
      setComments([
        {
          autor: autor,
          comentario: commentContent,
          rol: autor,
        },
      ]);
      setCommentContent("");

      setOpenAdd(false);
    } else {
      const updatedComments = [...comments];
      updatedComments[0].comentario = commentContent;
      setComments(updatedComments);
      setCommentContent("");
      setOpenAdd(false);
    }

    Swal.fire({
      title: "Información Guardada",
      text: "Los datos han sido guardados correctamente.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="flex" style={{ display: isShow ? "" : "none" }}>
      <Popover
        isOpen={OpenView}
        setIsOpen={setOpenView}
        rol={rol}
        comment={comments}
        setComments={setComments}
      />
      <DialogComponent
        isOpen={OpenAdd}
        title={
          comments.length === 1 ? "Editar Comentario" : "Añadir Comentario"
        }
        onClose={() => setOpenAdd(false)}
        content={
          <div className="w-full mt-4">
            <TextArea
              rows={3}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <div className="w-full flex justify-end">
              <button
                onClick={handleSaveComment}
                className="text-white px-3 py-2  cursor-pointer bg-blue-500
             hover:scale-105 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out
             mt-2"
                style={{
                  borderRadius: "10px",
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        }
        size="md"
      />
      <div className="flex" style={{ alignItems: "center" }}>
        <button
          className="text-white px-3 py-3 mr-2 cursor-pointer 
             hover:scale-105 
             active:scale-95 
             transition-transform 
             duration-150 
             ease-in-out"
          style={{
            borderRadius: "10px",
            display: rol ? "none" : "block",
            background:
              comments.length === 1 ? "rgb(77,210,0)" : "rgb(0,160,255)",
          }}
          onClick={() => setOpenAdd(true)}
        >
          {comments.length === 1 ? (
            <MdEdit style={{ width: "20px", height: "20px" }} />
          ) : (
            <FaRegCommentDots style={{ width: "20px", height: "20px" }} />
          )}
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
