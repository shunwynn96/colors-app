import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from "chroma-js";
import style from "./StyleModules/ColorBox.module.scss";

function ColorBox(props) {
  const [copied, setCopied] = useState(false);
  const changeCopyState = () => {
    setCopied(true);
  };

  useEffect(() => {
    const timerId = setTimeout(() => setCopied(false), 1500);

    return () => clearTimeout(timerId);
  }, [copied]);

  const isDarkColor = chroma(props.background).luminance() <= 0.08;
  const isLightColor = chroma(props.background).luminance() >= 0.5;

  return (
    <CopyToClipboard text={props.background} onCopy={changeCopyState}>
      <div style={{ background: props.background }} className="ColorBox">
        <div className={`${style.copyMsg} ${copied ? style.show : ""}`}>
          <h1>copied!</h1>
          <p className={isLightColor ? style.darkText : ""}>
            {props.background}
          </p>
        </div>

        <div className={style.boxContent}>
          <span className={isDarkColor ? style.lightText : ""}>
            {props.name}
          </span>
        </div>
        <button className={`copyButton ${isLightColor ? style.darkText : ""}`}>
          Copy
        </button>

        {props.showMore ? (
          <Link
            to={`/palette/${props.paletteId}/${props.colorId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={`${style.seeMore} ${
                isLightColor ? style.darkText : ""
              }`}
            >
              More
            </span>
          </Link>
        ) : (
          ""
        )}
        <div
          style={{ background: props.background }}
          className={`${style.copyOverlay} ${copied ? style.show : ""}`}
        />
      </div>
    </CopyToClipboard>
  );
}

export default ColorBox;
