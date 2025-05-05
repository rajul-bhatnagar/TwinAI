"use client";

import { Box, useTheme } from "@mui/material";
import Header from "./Header";
import Avatar3D from "./Avatar3D";
import ChatBox from "./ChatBox";
import { useThemeContext } from "../context/ThemeContext";


export default function ParentLayout() {
  const { darkMode } = useThemeContext();
  const theme = useTheme();

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      bgcolor={theme.palette.background.default}
      color={theme.palette.text.primary}
    >
      
      <Header />

      {/* Main content area */}
      <Box display="flex" flex={1} overflow="hidden">
        {/* Left - Avatar */}
        <Box
          width="50%"
          bgcolor={darkMode ? "##000000" : "#D3D3D3"}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar3D />
        </Box>

        {/* Right - Chat */}
        <Box
          width="50%"
          height="100%"
          bgcolor={darkMode ? "#121212" : "#ffffff"}
          color={theme.palette.text.primary}
        >
          <ChatBox />
        </Box>
      </Box>
    </Box>
  );
}
