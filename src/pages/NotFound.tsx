import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as HrefList from "./HrefList";

export default function NotFound() {
  return (
    <Container sx={{ my: 1 }}>
      <Typography variant="h1">404 Error!</Typography>
      <Button href={HrefList.home} variant="contained" sx={{ mt: 5 }}>
        Go Home
      </Button>
    </Container>
  );
}
