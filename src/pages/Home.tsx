import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography, { TypographyProps } from "@mui/material/Typography";
import * as HrefList from "./HrefList";

const StrongContext = (props: TypographyProps) => (
  <Typography
    variant="inherit"
    component="div"
    sx={{ fontSize: { xs: "4.5vw", sm: "2rem" } }}
  >
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
  return (
    <Container sx={{ my: 2 }}>
      <StrongContext>
        <Big>Our</Big> code is written by AI (and 1% of me).
      </StrongContext>
      <StrongContext>
        But it includes <Big>one</Big> mistake.
      </StrongContext>
      <StrongContext>
        Can you <Big>debug</Big> it?
      </StrongContext>

      <Box sx={{ mt: 3 }}>
        {/* <Button href={HrefList.list} variant="contained">
          List
        </Button> */}
        <Button href={HrefList.code + `/random`} variant="contained">
          Debug Random Code
        </Button>
      </Box>
    </Container>
  );
}
