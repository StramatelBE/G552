import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next"; // <- Ajoutez ceci
import { useSnackbar } from "../../contexts/SnackbarContext";
import authService from "../../services/authService";

function LostPasswordDialog({ open, onClose, users }) {
  const { t } = useTranslation(); //
  const { openSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [user, setUser] = useState({ id: null, username: "" });

  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    onClose();
  };

  function handleSubmit(e) {
    console.log("user", user);
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    } else if (adminPassword === "adminstramatel") {
      console.log("user", user);
      authService
        .lostPassword(newPassword, user.id)
        .then(() => {
          setError("");
          onClose();
          openSnackbar("Mot de passe modifié avec succès", "success");
        })
        .catch((error) => {
          console.log("Erreur", error.response.data.message);
          setError(error.response.data.message);
        });
    } else {
      setError("Mot de passe administrateur incorrect");
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t("Login.lostPassword")}</DialogTitle>{" "}
      {/* Utilisez t() pour traduire */}
      <DialogContent sx={{ padding: "0px 20px" }}>
        <FormControl sx={{ minWidth: "40vh" }}>
          <Select
            label="Utilisateur"
            value={user.id} // Utilisez l'id comme valeur de Select pour être unique
            onChange={(e) => {
              // Trouver l'utilisateur sélectionné par id
              const selectedUser = users.find(
                (u) => u.id.toString() === e.target.value
              );
              if (selectedUser) {
                setUser({
                  id: selectedUser.id,
                  username: selectedUser.username,
                });
              }
            }}
            required
            displayEmpty // Permet l'affichage d'une option vide si nécessaire
            renderValue={
              user.id ? undefined : () => "Sélectionnez un utilisateur"
            }
          >
            {users &&
              users.map((userOption) => (
                <MenuItem key={userOption.id} value={userOption.id.toString()}>
                  {userOption.username}
                </MenuItem>
              ))}
          </Select>
          <TextField
            sx={{ marginTop: "16px" }}
            label={t("Login.passwordAdmin")}
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          <TextField
            sx={{ marginTop: "16px" }}
            label={t("Login.newPassword")}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            sx={{ marginTop: "16px" }}
            label={t("Login.confirmNewPassword")}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          {t("Dialog.cancel")}
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          sx={{ color: "secondary.main" }}
        >
          {t("Dialog.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LostPasswordDialog;
