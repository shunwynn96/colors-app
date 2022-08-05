import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Picker from "@emoji-mart/react";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

function PaletteMetaForm(props) {
  const [saveStage, setSaveStage] = useState("form");
  const [newPaletteName, setNewPaletteName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      return props.palettes.every(
        ({ paletteName }) =>
          paletteName.toLowerCase() !== newPaletteName.toLowerCase()
      );
    });
  });

  const handleChange = (e) => {
    setNewPaletteName(e.target.value);
  };

  const switchStage = () => {
    setSaveStage("emoji");
  };

  const savePalette = (evt) => {
    const newPalette = { paletteName: newPaletteName, emoji: evt.native };
    props.handleSubmit(newPalette);
    setSaveStage("");
  };

  return (
    <div>
      <Dialog open={saveStage === "emoji"} onClose={props.hideForm}>
        <Picker onEmojiSelect={savePalette} navPosition="bottom" />
      </Dialog>
      <Dialog open={saveStage === "form"} onClose={props.hideForm}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={switchStage}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it
              is unique!
            </DialogContentText>

            <TextValidator
              label="Palette Name"
              name="newPaletteName"
              value={newPaletteName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter Palette Name",
                "Palette Name Already Exists",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.hideForm}>Cancel</Button>
            <Button variant="contained" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}

export default PaletteMetaForm;
