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

function DeleteMediaDialog({ open, onClose, DeleteFile, displayDialogDelete }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Dialog.confirmDeletion")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("Media.Dialog.areYouSureToDelete")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={displayDialogDelete} sx={{ color: "secondary.main" }}>
          {t("Dialog.cancel")}
        </Button>
        <Button onClick={DeleteFile} sx={{ color: "secondary.main" }}>
          {t("Dialog.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteMediaDialog;
