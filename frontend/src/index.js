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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
