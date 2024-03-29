import { PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ThemeOptions, ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LinkBehavior } from "./components/LinkBehavior";
import ValidateCode from "./pages/Code";
import Home from "./pages/Home";
import * as HrefList from "./pages/HrefList";
import Layout from "./pages/Layout";
import NotFound from "./pages/NotFound";
import RandomCode from "./pages/RandomCode";
import { ColorModeContext } from "./stores/ColorModeContext";

const customComponents: ThemeOptions["components"] = {
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
  MuiListItemButton: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
};

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  components: customComponents,
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  components: customComponents,
});

export const App = () => {
  const [theme, setTheme] = useState<PaletteMode>("light");

  const colorModeChanger = {
    setPaletteMode: (paletteMode: PaletteMode) => setTheme(paletteMode),
  };

  return (
    <>
      <ColorModeContext.Provider value={colorModeChanger}>
        <ThemeProvider theme={theme == "light" ? lightTheme : darkTheme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              "*": {
                padding: 0,
                margin: 0,
              },
            }}
          />
          <BrowserRouter>
            <Routes>
              <Route path={HrefList.home} element={<Layout />}>
                <Route index element={<Home />} />
                {/* <Route path={HrefList.list} element={<List />} /> */}
                <Route
                  path={`${HrefList.code}/:id`}
                  element={<ValidateCode />}
                />
                <Route path={HrefList.random} element={<RandomCode />} />
                <Route path="/*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};
