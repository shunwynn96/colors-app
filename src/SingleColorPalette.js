import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";
import style from "./StyleModules/SingleColorPalette.module.scss";

function SingleColorPalette(props) {
  const [format, setFormat] = useState("hex");
  const { paletteId, colorId } = useParams();

  const findPalette = (id) => {
    const palette = props.palettes.find((palette) => palette.id === id);
    return palette;
  };

  const currentPalette = findPalette(paletteId);

  const gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }

    return shades.slice(1);
  };

  const shades = gatherShades(currentPalette, colorId);

  const handleChange = (val) => {
    setFormat(val);
  };

  const createColorBox = shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showMore={false}
    />
  ));

  return (
    <div className="singleColorPalette">
      <Navbar handleChange={handleChange} hideSlider={true} />
      <div className={style.paletteColors}>
        {createColorBox}
        <div className={`ColorBox ${style.goBack}`}>
          <Link to={`/palette/${paletteId}`} className={style.backBtn}>
            GO BACK
          </Link>
        </div>
      </div>
      <PaletteFooter
        paletteName={currentPalette.paletteName}
        emoji={currentPalette.emoji}
      />
    </div>
  );
}

export default SingleColorPalette;
