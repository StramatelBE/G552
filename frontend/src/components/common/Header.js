import React from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importez useNavigate pour la redirection

function Header(props) {
  const navigate = useNavigate(); // Hook pour naviguer

  // Fonction pour gérer le clic avec les touches Ctrl et Alt enfoncées
  const handleLogoClick = (event) => {
    // Vérifie si les touches Ctrl et Alt étaient enfoncées lors du clic
    if (event.ctrlKey && event.altKey) {
      // Si oui, redirige vers /admin
      navigate("/admin");
    }
  };

  return (
    <AppBar
      sx={{
        justifyContent: "center",
        position: "sticky",
        top: "0",
        marginBottom: "2vh",
      }}
    >
      <Toolbar
        style={{
          justifyContent: "center",
          padding: "0",
        }}
      >
        <Box
          component="img"
          src={
            props.darkMode
              ? "/images/Logo_Stramatel_White.png"
              : "/images/Logo_Stramatel_Dark.png"
          }
          alt="Logo"
          sx={{ width: "200px", height: "auto" }}
          onClick={handleLogoClick} // Ajouter le gestionnaire d'événements ici
        />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
