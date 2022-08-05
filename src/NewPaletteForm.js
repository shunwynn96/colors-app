import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./StyleModules/NewPaletteForm.module.scss";
import DraggableColorList from "./DraggableColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import { seedPalettes } from "./seedPalettes";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  DndContext,
  PointerSensor,
  useSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToParentElement } from "@dnd-kit/modifiers";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

NewPaletteForm.defaultProps = {
  maxColors: 20,
};

function NewPaletteForm(props) {
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedPalettes[0].colors);
  const paletteFull = colors.length >= props.maxColors;

  const [name, setName] = useState({
    newColorName: "",
    newPaletteName: "",
  });
  const navigate = useNavigate();

  const sensors = [
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  ];

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setColors((colors) => {
        const oldIndex = colors.findIndex((color) => color.color === active.id);
        const newIndex = colors.findIndex((color) => color.color === over.id);

        return arrayMove(colors, oldIndex, newIndex);
      });
    }
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
    setName({ ...name, newColorName: "" });
  };

  const handleChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };

  const clearColors = () => {
    setColors([]);
  };

  const addRandomColor = () => {
    const allPaletteColors = props.palettes
      .map((palette) => palette.colors)
      .flat();
    let randomIndex = Math.floor(Math.random() * allPaletteColors.length);
    let randomColor = allPaletteColors[randomIndex];
    let checkDuplicateColor = true;
    while (checkDuplicateColor) {
      randomIndex = Math.floor(Math.random() * allPaletteColors.length);
      randomColor = allPaletteColors[randomIndex];
      checkDuplicateColor = colors.some(
        (color) => color.name === randomColor.name
      );
      console.log(randomColor.name);
    }

    setColors([...colors, randomColor]);
  };

  const handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replaceAll(" ", "-");
    newPalette.colors = colors;
    props.savePalette(newPalette);
    navigate("/");
  };

  const handleDelete = (colorName) => {
    setColors(colors.filter((color) => color.name !== colorName));
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <PaletteFormNav
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleSubmit={handleSubmit}
          name={name}
          palettes={props.palettes}
          handleChange={handleChange}
        />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <div className={style.drawerContainer}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={style.drawerButtons}>
              <Button variant="contained" color="error" onClick={clearColors}>
                Clear Palette
              </Button>
              <Button
                variant="contained"
                onClick={addRandomColor}
                disabled={paletteFull}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              paletteFull={paletteFull}
              addNewColor={addNewColor}
              colors={colors}
            />
          </div>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext
              items={colors.map((color) => color.color)}
              strategy={rectSortingStrategy}
            >
              <DraggableColorList colors={colors} handleDelete={handleDelete} />
            </SortableContext>
          </DndContext>
        </Main>
      </Box>
    </div>
  );
}

export default NewPaletteForm;
