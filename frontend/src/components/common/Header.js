import React, { useState } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importez useNavigate pour la redirection
import AdminDialog from "../dialogs/AdminDialog";
// import authService from "../../services/authService";
import useAuthStore from "../../stores/authStore";

function Header(props) {

  const { token } = useAuthStore();
  const [modal, setModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  function toggleModal() {
    setModal(!modal);
  }

  const handleLogoClick = (event) => {
    if (event.ctrlKey && event.altKey && token && currentPath !== "/admin") {
      toggleModal();
    }
  };

  function adminPasswordCheck() {
    if (adminPassword === process.env.REACT_APP_PASSWORD_ADMIN) {
      toggleModal();
      navigate("/admin");
      setAdminPassword("");
    } else {
      alert("Invalid password");
    }
  }

  return (
    <>
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
            onClick={handleLogoClick}
          />
        </Toolbar>
      </AppBar>
      <AdminDialog
        open={modal}
        onClose={toggleModal}
        adminPassword={adminPassword}
        setAdminPassword={setAdminPassword}
        onAdd={adminPasswordCheck}
      />
    </>
  );
}

export default Header;
