import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function TimerPickerDialog({ open, onClose, setTimer }) {
  const { t } = useTranslation();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleMinutesChange = (event) => {
    const inputMinutes = parseInt(event.target.value, 10);
    setMinutes(inputMinutes);
  };

  const handleSecondsChange = (event) => {
    const inputSeconds = parseInt(event.target.value, 10);
    setSeconds(inputSeconds);
  };

  const handleConfirm = () => {
    /* console.log(`Timer set to ${minutes} minutes and ${seconds} seconds`); */
    const timeInSeconds = minutes * 60 + seconds;
    setTimer(timeInSeconds);
    setMinutes(0);
    setSeconds(0);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("Profile.Dialog.chooseTime")}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {t("Profile.Dialog.pleaseSelectMinutesAndSeconds")}
        </DialogContentText>
        <Box display="flex" justifyContent="center">
          <FormControl sx={{ minWidth: 120, maxWidth: 200 }}>
            <Select
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "200px", // Limite la hauteur du menu déroulant
                  },
                },
              }}
              value={minutes}
              onChange={handleMinutesChange}
            >
              {Array.from({ length: 60 }, (_, index) => (
                <MenuItem key={index} value={index}>
                  {index}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, maxWidth: 200 }}>
            <Select
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: "200px", // Limite la hauteur du menu déroulant
                  },
                },
              }}
              value={seconds}
              onChange={handleSecondsChange}
            >
              {Array.from({ length: 60 }, (_, index) => (
                <MenuItem key={index} value={index}>
                  {index}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: "primary.main" }}>
          {t("Dialog.cancel")}
        </Button>
        <Button onClick={handleConfirm} sx={{ color: "secondary.main" }}>
          {t("Dialog.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TimerPickerDialog;
