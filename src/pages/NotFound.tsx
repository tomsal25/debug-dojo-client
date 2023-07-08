import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import * as HrefList from "./HrefList";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Container sx={{ my: 2 }}>
      <Typography variant="h2">{t("404.title")}</Typography>
      <Typography variant="h4">{t("404.text")}</Typography>
      <Button href={HrefList.home} variant="contained" sx={{ mt: 5 }}>
        {t("404.button")}
      </Button>
    </Container>
  );
}
