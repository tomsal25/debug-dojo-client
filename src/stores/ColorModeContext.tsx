import { PaletteMode } from "@mui/material";
import { createContext } from "react";

export const ColorModeContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPaletteMode: (_paletteMode: PaletteMode) => {
    if (import.meta.env.DEV) {
      console.error("ColorModeContext hasn't set properly.");
    }
  },
});
