import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaletteMetaForm from "./PaletteMetaForm";
import style from "./StyleModules/PaletteFormNav.module.scss";

import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function PaletteFormNav(props) {
  const [formShowing, setFormShowing] = useState(false);

  const navigate = useNavigate();

  const showForm = () => {
    setFormShowing(true);
  };

  const hideForm = () => {
    setFormShowing(false);
  };

  return (
    <div className={style.root}>
      <CssBaseline />
      <AppBar
        className={style.appBar}
        position="fixed"
        open={props.open}
        color="default"
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(props.open && { display: "none" }) }}
          >
            <LibraryAddIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={style.navBtns}>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/")}
          >
            Go Back
          </Button>
          <Button variant="contained" onClick={showForm}>
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing ? (
        <PaletteMetaForm
          hideForm={hideForm}
          palettes={props.palettes}
          handleSubmit={props.handleSubmit}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default PaletteFormNav;
