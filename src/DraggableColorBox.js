import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import style from "./StyleModules/DraggableColorBox.module.scss";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function DraggableColorBox(props) {
  const handleClick = () => {
    props.handleDelete(props.name);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    transform,
    isDragging,
  } = useSortable({ id: props.id });

  const styleDrag = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundColor: props.color,
    zIndex: isDragging ? "1" : "auto",
  };

  return (
    <div
      className={style.root}
      style={styleDrag}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <div className={style.boxContent}>
        <span>{props.name}</span>
        <DeleteIcon
          fontSize="small"
          className={style.deleteIcon}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default DraggableColorBox;
