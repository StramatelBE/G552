import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import { SnackbarProvider  } from "./contexts/SnackbarContext";

const root = ReactDOM.createRoot(document.getElementById("root"),{hotOnly: false});
root.render(
  <SnackbarProvider >
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </SnackbarProvider>
);


reportWebVitals();
