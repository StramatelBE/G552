import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import PermMediaIcon from "@mui/icons-material/PermMedia";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardIcon from "@mui/icons-material/Keyboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ScoreboardIcon from "@mui/icons-material/Scoreboard";

import AuthService from "../../services/authService";
import DisconnectDialog from "../dialogs/DisconnectDialog";

function NavBar() {
  const location = useLocation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  function handleLogoutDialogOpen() {
    setLogoutDialogOpen(true);
  }

  function handleLogoutDialogClose() {
    setLogoutDialogOpen(false);
  }

  async function logout() {
    await AuthService.logout();
    window.location.reload();
  }

  function getIconColor(path) {
    return location.pathname.startsWith(path)
      ? "secondary.main"
      : "secondary.light";
  }

  return (
    <Box sx={{ position: "fixed", bottom: "0", width: "100%" }}>
      <BottomNavigation value={location.pathname}>
        <BottomNavigationAction
          component={Link}
          to="/create"
          label="Événement"
          icon={<PermMediaIcon sx={{ color: getIconColor("/create") }} />}
        />

        <BottomNavigationAction
          component={Link}
          to="/macro"
          label="Macro"
          icon={<KeyboardIcon sx={{ color: getIconColor("/macro") }} />}
        />
        {/* <BottomNavigationAction
          component={Link}
          to="/scoreboard"
          label="scoreboard"
          icon={<ScoreboardIcon sx={{ color: getIconColor("/scoreboard") }} />}
        />*/}
        <BottomNavigationAction
          component={Link}
          to="/profile"
          label="Profile"
          icon={<SettingsIcon sx={{ color: getIconColor("/profile") }} />}
        />
        <BottomNavigationAction
          component={Link}
          onClick={handleLogoutDialogOpen}
          label="Déconnexion"
          icon={<LogoutIcon sx={{ color: getIconColor("/login") }} />}
        />
      </BottomNavigation>

      <DisconnectDialog
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        logout={logout}
      />
    </Box>
  );
}
export default NavBar;
