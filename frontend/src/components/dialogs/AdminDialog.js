import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function AdminDialog({ open, onClose, onAdd, adminPassword, setAdminPassword }) {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Login.password")}</DialogTitle>
      <DialogContent>
        <TextField
          type="password"
          fullWidth
          id="standard-basic"
          autoComplete="off"
          value={adminPassword}
          onChange={(e) => setAdminPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          {t("Dialog.cancel")}
        </Button>
        <Button
          onClick={onAdd}
          sx={{ color: "secondary.main" }}

        >
          {t("Dialog.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AdminDialog;
