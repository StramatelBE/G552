import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function UserConnectedDialog({ open, onClose, userDisconnect }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Login.Dialog.userAlreadyConnected")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("Login.Dialog.doYouWantToDisconnect")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          {t("Dialog.no")}
        </Button>
        <Button onClick={userDisconnect} sx={{ color: "secondary.main" }}>
          {t("Dialog.yes")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserConnectedDialog;
