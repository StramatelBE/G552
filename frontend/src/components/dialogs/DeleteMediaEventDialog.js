import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function DeleteMediaEventDialog({ open, onClose, onDelete }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Diaporama.Dialog.areYouSureToDelete")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("Diaporama.Dialog.areYouSureToDeleteMediaEvent")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          {t("Dialog.cancel")}
        </Button>
        <Button onClick={onDelete} sx={{ color: "secondary.main" }}>
          {t("Dialog.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteMediaEventDialog;
