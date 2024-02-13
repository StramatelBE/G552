import React, { createContext, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const SnackbarContext = createContext();

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider(props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("info");

  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }

  function handleSnackbarOpen(message, type) {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  }

  return (
    <SnackbarContext.Provider value={{ openSnackbar: handleSnackbarOpen }}>
      {props.children}

      <Snackbar  open={snackbarOpen} autoHideDuration={6000}  onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarType} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

     
    </SnackbarContext.Provider>
  );
}