import React from "react";
import DraggableColorBox from "./DraggableColorBox";

function DraggableColorList(props) {
  return (
    <div style={{ height: "100%" }}>
      {props.colors.map((color) => (
        <DraggableColorBox
          key={color.name}
          id={color.color}
          color={color.color}
          name={color.name}
          handleDelete={props.handleDelete}
        />
      ))}
    </div>
  );
}

export default DraggableColorList;
