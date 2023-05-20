import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import * as HrefList from "./HrefList";

export default function NotworkError() {
  return (
    <Container sx={{ my: 1 }}>
      <Typography variant="h3">Something went wrong.</Typography>
      <Typography variant="h4">Please try again after a while.</Typography>
      <Button href={HrefList.home} variant="contained" sx={{ mt: 5 }}>
        Go Home
      </Button>
    </Container>
  );
}
