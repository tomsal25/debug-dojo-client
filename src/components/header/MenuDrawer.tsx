import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import * as HrefList from "../../pages/HrefList";

export const MenuDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const { t } = useTranslation();

  const ListItemLink = ({ href, text }: { href: string; text: string }) => {
    return (
      <ListItemButton href={href} onClick={() => setIsDrawerOpen(false)}>
        <ListItemText primary={text} />
      </ListItemButton>
    );
  };

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: "60vw", maxWidth: 300 } }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            {t("header.menu.title")}
          </Typography>

          <Divider />

          <List>
            <ListItemLink href={HrefList.home} text={t("header.menu.home")} />
            <ListItemLink
              href={HrefList.random}
              text={t("header.menu.random")}
            />
          </List>
        </Box>
      </Drawer>
    </>
  );
};
