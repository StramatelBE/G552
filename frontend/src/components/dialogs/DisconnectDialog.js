import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function DisconnectDialog({ open, onClose, logout }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogContentText>
          {t("Login.Dialog.doYouReallyWantToLogout")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          {t("Dialog.cancel")}
        </Button>
        <Button
          component={Link}
          to="/login"
          onClick={logout}
          sx={{ color: "secondary.main" }}
        >
          {t("Dialog.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DisconnectDialog;
