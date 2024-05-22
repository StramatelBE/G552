import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  FormControl,
  DialogContentText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import eventService from "../../services/eventService";

function UpdateNameDialogOpen({ open, onClose, event }) {
  const { t } = useTranslation();

  const [newName, setNewName] = useState(event?.name || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEvent = { ...event, name: newName };
      const response = await eventService.update(updatedEvent);
      if (response) {
        setNewName("")
        onClose()
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setNewName(event?.name || "");
  }, [event]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <DialogTitle>{t("Diaporama.DialogUpdate.newName")}</DialogTitle>
        <FormControl sx={{ minWidth: "40vh" }}>
          <TextField
            sx={{ marginTop: "16px" }}
            label={t("Diaporama.Dialog.name")}
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "secondary.main" }}>
          {t("Dialog.cancel")}
        </Button>
        <Button onClick={handleSubmit} sx={{ color: "secondary.main" }}>
          {t("Dialog.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateNameDialogOpen;