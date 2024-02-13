import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function DeleteEventDialog({ open, onClose, onDelete, eventName }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Dialog.confirmDeletion")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("Diaporama.Dialog.areYouSureToDelete")}{" "}
          <strong>{eventName}</strong> ?
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

export default DeleteEventDialog;
