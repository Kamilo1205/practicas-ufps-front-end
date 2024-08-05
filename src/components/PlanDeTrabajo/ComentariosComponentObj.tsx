import { FC, useState, useEffect } from "react";
import Popover from "../ui/Dialog/PopOver";
import { FaRegCommentDots } from "react-icons/fa";
import { BiShowAlt } from "react-icons/bi";
import { DialogComponent } from "../ui/Dialog/DialogComponent";
import { RiEyeCloseFill } from "react-icons/ri";
import { TextArea } from "../ui";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { Comentario } from "../../interfaces";
import useComentario from "../../hooks/useComentario";
import { Objetivos } from "../../interfaces/objetivos.interface";
import { useAuth } from "../../contexts";

interface ComentariosProps {
  rol?: boolean;
  isShow?: boolean;
  comments?: Comentario[];
  setComments: React.Dispatch<React.SetStateAction<Comentario[]>>;
  autor: string;
  obj?: Objetivos;
}

const ComentariosComponentObj: FC<ComentariosProps> = ({
  rol = false,
  isShow,
  comments = [],
  setComments,
  autor,
  obj,
}) => {
  const { createComentario, updateComentario, deleteComentario } =
    useComentario();
  const [OpenView, setOpenView] = useState(false);
  const [OpenAdd, setOpenAdd] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [index, setIndex] = useState(0);

  const { user } = useAuth();
  const tieneComentarios = () => {
    return comments.some((c) => c.autor?.id === user?.id);
  };
  const hasComments = tieneComentarios();
  const handleSaveComment = () => {
    if (!hasComments) {
      const comentario = {
        comentario: commentContent,
        objetivoId: obj?.id,
      };

      createComentario(comentario).then((response) => {
        if (response.ok === "ok") {
          Swal.fire({
            title: "Información guardada",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          setComments([...comments, response.data]);
        } else {
          Swal.fire({
            title: "Ha ocurrido un error",
            text: "No se guardo la Información",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      });
      setCommentContent("");
      setOpenAdd(false);
    } else {
      const comentario = {
        id: comments[index].id,
        comentario: commentContent,
        objetivoId: obj?.id,
      };
      updateComentario(comentario).then((response) => {
        if (response.ok === "ok") {
          Swal.fire({
            title: "Información guardada",
            text: "Los datos han sido guardados correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          const newComentarios = comments.map((c) =>
            c.autor?.id === response.data.autor?.id ? response?.data : c
          );
          setComments(newComentarios);
        } else {
          Swal.fire({
            title: "Ha ocurrido un error",
            text: "No se guardo la Información",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      });
      setOpenAdd(false);
    }
  };

  useEffect(() => {
    if (comments == null || comments.length == 0) {
      setCommentContent("");
    } else {
      comments.forEach((c, index) => {
        if (c.autor?.id === user?.id) {
          setCommentContent(c.comentario);
          setIndex(index);
        }
      });
    }
  }, [comments, user, OpenAdd]);

  return (
    <div className="flex" style={{ display: isShow ? "" : "none" }}>
      <Popover
        isOpen={OpenView}
        setIsOpen={setOpenView}
        rol={rol}
        comment={comments}
        setComments={setComments}
        deleteComentario={deleteComentario}
        index={index}
        setIndex={setIndex}
      />
      <DialogComponent
        isOpen={OpenAdd}
        title={
          comments.length === 1 ? "Editar Comentario" : "Añadir Comentario"
        }
        onClose={() => {
          setOpenAdd(false);
        }}
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
            background: hasComments ? "rgb(77,210,0)" : "rgb(0,160,255)",
          }}
          onClick={() => setOpenAdd(true)}
        >
          {hasComments ? (
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

export default ComentariosComponentObj;
