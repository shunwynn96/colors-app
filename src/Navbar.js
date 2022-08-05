import React, { useState } from "react";
import { Link } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Select from "@mui/material/Select";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import style from "./StyleModules/Navbar.module.scss";

function Navbar(props) {
  const [format, setFormat] = useState("hex");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleChange = (e) => {
    setFormat(e.target.value);
    setOpenSnackBar(true);
    props.handleChange(e.target.value);
  };

  const closeSnackBar = () => {
    setOpenSnackBar(false);
  };

  return (
    <header className={style.Navbar}>
      <div className={style.logo}>
        <Link to="/">ColorPicker</Link>
      </div>

      {props.hideSlider ? (
        ""
      ) : (
        <div>
          <span>Darkness Level: {props.range}</span>
          <div className={style.slider}>
            <Slider
              defaultValue={props.range}
              min={100}
              max={900}
              step={100}
              onAfterChange={props.changeRange}
            />
          </div>
        </div>
      )}

      <div className={style.selectContainer}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <Select value={format} onChange={handleChange}>
            <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openSnackBar}
        autoHideDuration={3000}
        message={<span id="message-id">Format Changed!</span>}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClose={closeSnackBar}
        action={[
          <IconButton
            onClick={closeSnackBar}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
}

export default Navbar;
