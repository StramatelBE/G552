import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import CloseIcon from "@mui/icons-material/Close";
import AuthService from "../../services/authService";

function ChangePassword() {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (newPassword !== confirmPassword) {
      setError(t("Login.passwordMismatch"));
    }
    try {
      await AuthService.changePassword(newPassword);
      user.user.firstLogin = 0;
      localStorage.setItem("user", JSON.stringify(user));
      setSuccess(true);
      setError(null);
      AuthService.logout();
    } catch (error) {
      console.log("error01", error);
      setError(error);
    }
  }

  function disconnect() {
    AuthService.logout();
    window.location.reload();
  }

  return (
    <Grid item>
      <Paper>
        <Box className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton onClick={disconnect}>
              <CloseIcon
                sx={{ color: "secondary.main" }}
                className="headerButton"
              />
            </IconButton>
            <Typography
              className="headerTitle"
              variant="h6"
              sx={{ color: "primary.light" }}
            >
              {t("Login.passwordChange")}
            </Typography>
          </Box>
        </Box>
        <Box className="centeredContainer">
          {success ? (
            <Typography color="success.main" align="center">
              {t("Login.passwordChangeSuccess")}
            </Typography>
          ) : (
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ width: "35vh" }}>
                <TextField
                  label={t("Login.newPassword")}
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <TextField
                  label={t("Login.confirmNewPassword")}
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  margin="normal"
                />
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
                  {t("Login.passwordChange")}
                </Button>
              </FormControl>
            </form>
          )}
        </Box>
      </Paper>
    </Grid>
  );
}

export default ChangePassword;
