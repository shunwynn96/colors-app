import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import style from "./StyleModules/Palette.module.scss";

function Palette(props) {
  const [range, setRange] = useState(500);
  const [format, setFormat] = useState("hex");
  const { id } = useParams();

  const findPalette = (id) => {
    const palette = props.palettes.find((palette) => palette.id === id);
    return palette;
  };

  const currentPalette = findPalette(id);

  const colorBoxes = currentPalette.colors[range].map((color) => (
    <ColorBox
      key={color.id}
      colorId={color.id}
      paletteId={currentPalette.id}
      background={color[format]}
      name={color.name}
      showMore={true}
    />
  ));

  const changeRange = (newRange) => {
    setRange(newRange);
  };

  const handleChange = (val) => {
    setFormat(val);
  };

  return (
    <div className={style.palette}>
      <Navbar
        range={range}
        changeRange={changeRange}
        handleChange={handleChange}
        hideSlider={false}
      />
      <div className={style.paletteColors}>{colorBoxes}</div>
      <PaletteFooter
        paletteName={currentPalette.paletteName}
        emoji={currentPalette.emoji}
      />
    </div>
  );
}

export default Palette;
