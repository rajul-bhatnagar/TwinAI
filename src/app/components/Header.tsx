"use client";

import { Box, Typography, IconButton, Popover } from "@mui/material";
import { useState, useRef } from "react";
import Navbar from "./Navbar";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box
      bgcolor="#1e1e2f"
      color="white"
      display="flex"
      flexDirection="column"
      px={3}
      py={1.5}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          🧠 MyTwinAI 
        </Typography>
        <IconButton onClick={handleClick} color="inherit">
          <MenuIcon />
        </IconButton>
      </Box>

      {/* Popover for Navbar */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "white",
            color: "#333",
            padding: 1,
            width: 250,
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <Navbar />
      </Popover>
    </Box>
  );
}
