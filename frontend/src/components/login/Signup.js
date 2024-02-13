import AuthService from "../../../services/authService";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
    InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";

const Signup = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    AuthService.register(user, password, role).then(
      /* (response) => {
        setError( response.data.message,);
      }, */
      (error) => {
        const resMessage =
          (error.response &&
            error.message.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setError(resMessage);
      }
    );
  }

  return (
    <Container className="center" maxWidth="sm" component="main">
      <Paper
        elevation={3}
        sx={{ display: "flex", borderRadius: 2}}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nom d'utilisateur"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            fullWidth
          
          />
          <TextField
            label="Mot de passe"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
          
          />
          <TextField
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
          
          />
          <InputLabel id="demo-simple-select-label">
            Sélectionner un rôle
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="roles"
            onChange={(e) => setRole(e.target.value)}
          >
            <MenuItem value="user">Utilisateur</MenuItem>
            <MenuItem value="admin">Administrateur</MenuItem>
            <MenuItem value="superuser">Super Utilisateur</MenuItem>
          </Select>
          {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary">
            S'inscrire
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
