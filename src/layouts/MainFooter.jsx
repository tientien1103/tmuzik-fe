import React from "react";
import { Link, Typography } from "@mui/material";

function MainFooter() {
  return (
    <Typography variant="body2" sx={{ color: "#fff" }} align="center" p={1}>
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/tientien1103">
        Thuy Tien
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;
