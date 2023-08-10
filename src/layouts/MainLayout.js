import React from "react";
import { Box } from "@mui/material";
import MainHeader from "./MainHeader";
import MainFooter from "./MainFooter";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f2647f] to-[#A6E3E9]">
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </div>
  );
}

export default MainLayout;
