import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import style from "./StyleModules/ColorPickerForm.module.scss";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";

function ColorPickerForm(props) {
  const [currentColor, setCurrentColor] = useState("#2EC044");
  const [newColorName, setNewColorName] = useState("");

  const updateCurrentColor = (color) => {
    setCurrentColor(color.hex);
  };

  const handleChange = (evt) => {
    setNewColorName(evt.target.value);
  };

  const handleSubmit = () => {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    props.addNewColor(newColor);
    setNewColorName("");
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return props.colors.every(({ color }) => color !== currentColor);
    });
  });

  return (
    <div className={style.colorPickerForm}>
      <ChromePicker
        className={style.picker}
        color={currentColor}
        width="100%"
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate={false}>
        <TextValidator
          className={style.colorNameInput}
          value={newColorName}
          name="newColorName"
          label="Color Name"
          onChange={handleChange}
          variant="filled"
          margin="normal"
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color already used!",
          ]}
        />
        <Button
          className={style.addColor}
          variant="contained"
          style={{ backgroundColor: props.paletteFull ? "grey" : currentColor }}
          type="submit"
          disabled={props.paletteFull}
        >
          {props.paletteFull ? "Pallet Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
}

export default ColorPickerForm;
