import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Select,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import UserConnectedDialog from "../dialogs/UserConnectedDialog";
import ActiveSessionsService from "../../services/activeSessionsService";
import authService from "../../services/authService";
import userService from "../../services/userService";
import LostPasswordDialog from "../dialogs/LostPasswordDialog";

function Login() {
  const [users, setUsers] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [openUserConnectedDialog, setOpenUserConnectedDialog] = useState(false);
  const { t } = useTranslation();
  const [openChangePassword, setOpenChangePassword] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  async function getUsers() {
    const result = await userService.getAll();
    console.log("result", result);
    setUsers(result);
  }

  function deleteUserConected() {
    ActiveSessionsService.deleteCurrentUser();
    handleSubmit();
    closeUserConnectedDialog();
  }

  function lostPassword() {
    setOpenChangePassword(!openChangePassword);
  }

  function UserConnectedDialogOpen() {
    setOpenUserConnectedDialog(true);
  }

  function closeUserConnectedDialog() {
    setOpenUserConnectedDialog(false);
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    try {
      await authService.login(user, password).then((response) => {
        if (response.status === 409 && response.isConnected) {
          UserConnectedDialogOpen();
        }
      });
    } catch (error) {
      setError(t("Login.errorMessage"));
    }
  }

  return (
    <Grid item>
      <Paper>
        <Box className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled>
              <LoginIcon
                sx={{ color: "primary.light" }}
                className="headerButton"
              />
            </IconButton>
            <Typography
              className="headerTitle"
              variant="h6"
              sx={{ color: "primary.light" }}
            >
              {t("Login.title")}
            </Typography>
          </Box>
        </Box>

        <Box className="centeredContainer">
          <form onSubmit={handleSubmit}>
            <FormControl sx={{ width: "35vh" }}>
              <InputLabel>{t("Login.username")}</InputLabel>
              <Select
                labelId="user-select-label"
                label={t("Login.username")}
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              >
                {users &&
                  users.map((userOption) => (
                    <MenuItem key={userOption.id} value={userOption.username}>
                      {userOption.username}
                    </MenuItem>
                  ))}
              </Select>
              <TextField
                label={t("Login.password")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                margin="normal"
              />
              <Typography
                variant="body2"
                sx={{
                  textAlign: "center",
                  height: "1.5em",
                  color: "secondary.main",
                  cursor: "pointer",
                }}
                onClick={lostPassword}
              >
                {t("Login.lostPassword")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: error ? "error.main" : "transparent",
                  textAlign: "center",
                  height: "1.5em",
                }}
              >
                {error || " "}
              </Typography>

              <Button type="submit" sx={{ color: "secondary.main" }}>
                {t("Login.loginButton")}
              </Button>
            </FormControl>
          </form>
        </Box>
      </Paper>
      <LostPasswordDialog
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
        users={users}
      />
      <UserConnectedDialog
        open={openUserConnectedDialog}
        onClose={closeUserConnectedDialog}
        userDisconnect={deleteUserConected}
      />
    </Grid>
  );
}

export default Login;
