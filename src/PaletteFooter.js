import React from "react";
import style from "./StyleModules/Palette.module.scss";

function PaletteFooter(props) {
  return (
    <div>
      <footer className={style.paletteFooter}>
        <p>{props.paletteName}</p>
        <span className={style.emoji}>{props.emoji}</span>
      </footer>
    </div>
  );
}

export default PaletteFooter;
