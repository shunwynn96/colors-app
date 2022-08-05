import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PaletteList from "./PaletteList";
import Page from "./page";
import Palette from "./Palette";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";
import { seedPalettes } from "./seedPalettes";
import { generatePalette } from "./colorHelpers";
import { CSSTransition, TransitionGroup } from "react-transition-group";

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
  const [palettes, setPalettes] = useState(savedPalettes || seedPalettes);
  const newPalettes = palettes.map((palette) => generatePalette(palette));

  const location = useLocation();

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
  };

  const deletePalette = (id) => {
    const updatedPalettes = palettes.filter((palette) => palette.id !== id);
    setPalettes(updatedPalettes);
  };

  useEffect(() => {
    const syncLocalStorage = () => {
      window.localStorage.setItem("palettes", JSON.stringify(palettes));
    };
    syncLocalStorage();
  }, [palettes]);

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="page" timeout={500}>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />

          <Route
            path="/palette/new"
            element={
              <Page>
                <NewPaletteForm savePalette={savePalette} palettes={palettes} />
              </Page>
            }
          />
          <Route
            path="/palette/:id"
            element={
              <Page>
                <Palette palettes={newPalettes} />
              </Page>
            }
          />
          <Route
            path="/palette/:paletteId/:colorId"
            element={
              <Page>
                <SingleColorPalette palettes={newPalettes} />
              </Page>
            }
          />
          <Route
            path="*"
            element={<h1>this is not the page you are looking for</h1>}
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
