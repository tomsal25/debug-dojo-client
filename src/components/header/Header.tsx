import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { MenuDrawer } from "./MenuDrawer";
import { SettingDrawer } from "./SettingDrawer";

export const Header = styled((props: AppBarProps) => {
  return (
    <AppBar {...props}>
      <Toolbar>
        <MenuDrawer />

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Debug Dojo
        </Typography>

        <SettingDrawer />
      </Toolbar>
    </AppBar>
  );
})(({ theme }) => ({
  border: `2px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
}));
