import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { ColorModeContext } from "./stores/ColorModeContext";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App = () => {
  const [theme, setTheme] = useState<PaletteMode>("light");

  const colorModeChanger = {
    toggleColorMode: () => {
      setTheme(prevMode => (prevMode == "light" ? "dark" : "light"));
    },
  };

  return (
    <>
      <ColorModeContext.Provider value={colorModeChanger}>
        <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              "*": {
                padding: "0",
                margin: "0",
              },
            }}
          />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};
