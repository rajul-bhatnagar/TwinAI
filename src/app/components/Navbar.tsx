import { Box, Button, Typography, useTheme } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useThemeContext();
  const theme = useTheme();

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      bgcolor={theme.palette.background.paper} 
      color={theme.palette.text.primary}
      borderRadius={2}
      padding={2}
      width={250}
    >
      <Button startIcon={<HomeIcon />} fullWidth sx={{ justifyContent: "flex-start" }}>
        <Typography variant="body1">Home</Typography>
      </Button>
      <Button startIcon={<PersonIcon />} fullWidth sx={{ justifyContent: "flex-start" }}>
        <Typography variant="body1">Profile</Typography>
      </Button>
      <Button startIcon={<SettingsIcon />} fullWidth sx={{ justifyContent: "flex-start" }}>
        <Typography variant="body1">Settings</Typography>
      </Button>
      <Button
        startIcon={darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        onClick={toggleDarkMode}
        fullWidth
        sx={{ justifyContent: "flex-start" }}
      >
        <Typography variant="body1">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Typography>
      </Button>
    </Box>
  );
}