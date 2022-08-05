import React, { memo } from "react";
import style from "./StyleModules/MiniPalette.module.scss";

import DeleteIcon from "@mui/icons-material/Delete";

function MiniPalette(props) {
  const createMiniColorBoxes = props.colors.map((color) => (
    <div
      className={style.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    ></div>
  ));

  const handleClick = () => {
    props.handleClick(props.id);
  };

  const deletePalette = (evt) => {
    evt.stopPropagation();
    props.openDialog(props.id);
  };

  return (
    <div className={style.root} onClick={handleClick}>
      <DeleteIcon
        className={style.deleteIcon}
        sx={{ transition: "all 0.3s ease-in-out" }}
        onClick={deletePalette}
      />

      <div className={style.colors}>{createMiniColorBoxes}</div>
      <h5 className={style.title}>
        {props.paletteName}
        <span className={style.emoji}>{props.emoji}</span>
      </h5>
    </div>
  );
}

//To prevent re-rendering of all components when deleting a single component
export default memo(MiniPalette, (prevProps, nextProps) => {
  if (prevProps.openDialog !== nextProps.openDialog) {
    return true;
  }
  return false;
});
