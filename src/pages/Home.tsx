import CasinoIcon from "@mui/icons-material/Casino";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import { Trans, useTranslation } from "react-i18next";
import * as HrefList from "./HrefList";

const commonFontSize: SxProps<Theme> = {
  fontSize: { xs: "4.5vw", sm: "2rem" },
};

const StrongContext = (props: TypographyProps) => (
  <Typography variant="inherit" component="div" sx={commonFontSize}>
    {props.children}
  </Typography>
);

const Big = (props: TypographyProps) => (
  <Typography
    variant="inherit"
    component="span"
    sx={{ fontSize: "1.8em", fontWeight: "bold" }}
  >
    {props.children}
  </Typography>
);

export default function Home() {
  const { t } = useTranslation();

  return (
    <Container sx={{ my: 2 }}>
      <StrongContext>
        <Trans i18nKey="home.title.1" components={{ Big: <Big /> }} />
      </StrongContext>
      <StrongContext>
        <Trans i18nKey="home.title.2" components={{ Big: <Big /> }} />
      </StrongContext>
      <StrongContext>
        <Trans i18nKey="home.title.3" components={{ Big: <Big /> }} />
      </StrongContext>

      <Box sx={{ mt: 3 }}>
        {/* <Button href={HrefList.list} variant="contained">
          List
        </Button> */}
        <Button
          href={HrefList.random}
          variant="contained"
          startIcon={<CasinoIcon />}
          sx={commonFontSize}
        >
          {t("home.debugButton")}
        </Button>
      </Box>
    </Container>
  );
}
