import InvertColorsIcon from "@mui/icons-material/InvertColors";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SettingsIcon from "@mui/icons-material/Settings";
import TranslateIcon from "@mui/icons-material/Translate";
import { PaletteMode, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import i18next from "i18next";
import { JSX, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "../../stores/ColorModeContext";

const ListItemDrawer = ({
  icon,
  text,
  ...props
}: {
  icon: JSX.Element;
  text: string;
} & ListItemButtonProps) => {
  return (
    <ListItemButton {...props}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} />
      <ListItemIcon sx={{ justifyContent: "end" }}>
        <NavigateNextIcon />
      </ListItemIcon>
    </ListItemButton>
  );
};

const DarkModePage = () => {
  const { setPaletteMode } = useContext(ColorModeContext);

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <FormControl sx={{ width: "100%", pl: 3.5, mt: 1 }}>
      <RadioGroup
        value={theme.palette.mode}
        name="color-scheme"
        onChange={event => setPaletteMode(event.target.value as PaletteMode)}
      >
        <FormControlLabel
          value="light"
          control={<Radio />}
          label={t("header.setting.darkmode.radio.light")}
        />
        <FormControlLabel
          value="dark"
          control={<Radio />}
          label={t("header.setting.darkmode.radio.dark")}
        />
      </RadioGroup>
    </FormControl>
  );
};

const TranslatePage = () => {
  const [language, setLanguage] = useState("");

  useEffect(() => {
    setLanguage(i18next.resolvedLanguage ?? "en");
  }, []);

  useEffect(() => {
    setLanguage(i18next.language);
  }, []);

  return (
    <FormControl sx={{ width: "100%", pl: 3.5, mt: 1 }}>
      <RadioGroup
        value={language}
        name="language-group"
        onChange={event => {
          const currentLang = event.target.value;
          i18next
            .changeLanguage(currentLang)
            .then(() => setLanguage(currentLang))
            .catch(() => setLanguage("en"));
        }}
      >
        <FormControlLabel value="en" control={<Radio />} label="English" />
        <FormControlLabel value="ja" control={<Radio />} label="日本語" />
      </RadioGroup>
    </FormControl>
  );
};

const MainContent = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { t } = useTranslation();

  // TODO: consider using slide
  const Page = ({ title, page }: { title: string; page: JSX.Element }) => {
    return (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton aria-label="back" onClick={() => setCurrentPage(0)}>
            <NavigateBeforeIcon />
          </IconButton>
          <span>{title}</span>
        </Box>
        <Divider />
        {page}
      </Box>
    );
  };

  if (currentPage == 1)
    return (
      <Page
        title={t("header.setting.darkmode.title")}
        page={<DarkModePage />}
      />
    );
  if (currentPage == 2)
    return (
      <Page
        title={t("header.setting.translate.title")}
        page={<TranslatePage />}
      />
    );
  else
    return (
      <List>
        <ListItemDrawer
          icon={<InvertColorsIcon />}
          text={t("header.setting.darkmode.item")}
          onClick={() => setCurrentPage(1)}
        />
        <ListItemDrawer
          icon={<TranslateIcon />}
          text={t("header.setting.translate.item")}
          onClick={() => setCurrentPage(2)}
        />
      </List>
    );
};

export const SettingDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const { t } = useTranslation();

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={toggleDrawer}
      >
        <SettingsIcon />
      </IconButton>

      <Drawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        anchor="right"
        sx={{ "& .MuiDrawer-paper": { width: "60vw", maxWidth: 300 } }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            {t("header.setting.drawer.title")}
          </Typography>

          <Divider />

          <MainContent />
        </Box>
      </Drawer>
    </>
  );
};
