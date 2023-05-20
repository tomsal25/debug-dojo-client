import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const Loading = ({ open = true }: { open?: boolean }) => {
  return (
    <Backdrop open={open} sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
