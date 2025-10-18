// src/components/GlassAppBar.jsx
import React from "react";
import { AppBar } from "@mui/material";
import { alpha } from "@mui/material/styles";

const GlassAppBar = (props) => {
  return (
    <AppBar
      {...props}
      sx={{
        backgroundColor: alpha("#ffffff", 0.1), // glass effect
        backdropFilter: "blur(10px)",
        boxShadow: "none",
      }}
    />
  );
};

export default GlassAppBar;
