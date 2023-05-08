import InvertColorsIcon from "@mui/icons-material/InvertColors";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import { ColorModeContext } from "../stores/ColorModeContext";

export const Header = styled((props: AppBarProps) => {
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar {...props}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Debug Dojo
          </Typography>
          <IconButton
            color="inherit"
            sx={{ position: "relative" }}
            onClick={colorMode.toggleColorMode}
          >
            <InvertColorsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
})(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
}));
