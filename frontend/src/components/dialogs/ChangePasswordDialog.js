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
} from "@mui/material";
import { useTranslation } from "react-i18next"; // <- Ajoutez ceci
import { useSnackbar } from "../../contexts/SnackbarContext";
import authService from "../../services/authService";

function ChangePasswordDialog({ open, onClose }) {
  const { t } = useTranslation(); //
  const { openSnackbar } = useSnackbar();
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    setError(null);
    onClose();
  };

  function handleSubmit(e) {
    e.preventDefault();

    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    // Appeler le service d'authentification pour changer le mot de passe
    authService
      .changePassword(newPassword)
      .then(() => {
        setError("");
        onClose();
        openSnackbar("Mot de passe modifié avec succès", "success");
      })
      .catch((error) => {
        console.log("Erreur", error.response.data.message);
        setError(error.response.data.message);
      });
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{t("Login.passwordChange")}</DialogTitle>{" "}
      {/* Utilisez t() pour traduire */}
      <DialogContent sx={{ padding: "0px 20px" }}>
        <FormControl sx={{ minWidth: "40vh" }}>
          <TextField
            sx={{ marginTop: "16px" }}
            label={t("Login.newPassword")}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            sx={{ marginTop: "16px" }}
            label={t("Login.confirmPassword")}
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

export default ChangePasswordDialog;
