import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import KeyboardIcon from "@mui/icons-material/Keyboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import SettingsIcon from "@mui/icons-material/Settings";

import AuthService from "../../services/authService";
import DisconnectDialog from "../dialogs/DisconnectDialog";
import useAuthStore from '../../stores/authStore';

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
    const { clearToken, clearUser } = useAuthStore.getState();
    clearToken();
    clearUser();
    await AuthService.logout();
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
