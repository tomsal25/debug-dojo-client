import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

const Layout = () => {
  return (
    <>
      <Header />
      {/* for margin */}
      <Toolbar />
      <Outlet />
    </>
  );
};

export default Layout;
