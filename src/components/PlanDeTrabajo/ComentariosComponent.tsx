import { useState } from "react";
import Popover from "./../ui/Dialog/PopOver";

const ComentariosComponent = () => {
  const [OpenView, setOpenView] = useState(false);
  return (
    <div>
      <button>+</button>
      <button onClick={() => setOpenView(true)}>Ver</button>
      <Popover isOpen={OpenView} setIsOpen={setOpenView} />
    </div>
  );
};

export default ComentariosComponent;
