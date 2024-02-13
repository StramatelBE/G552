import React from "react";
import {
  TextField,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";

function VolleyballSetting(props) {
  const { gameState, setGameState, updateDB, open, onClose } = props;

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setGameState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };
  const saveSettings = () => {
    updateDB("nom_team1", gameState.nom_team1);
    updateDB("nom_team2", gameState.nom_team2);
    updateDB("option1", gameState.option1);
    updateDB("option2", gameState.option2);
    updateDB("option3", gameState.option3);
    onClose();
  }


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Paramètres Badminton</DialogTitle>
      <DialogContent>
        <Box pl={4} pr={4}>
          <Grid pb={2} direction="row" alignItems="center" container>
            <Grid item xs={6}>
              <Typography>Nom équipe 1</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={gameState.nom_team1}
                onChange={handleChange("nom_team1")}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid pb={2} direction="row" alignItems="center" container>
            <Grid item xs={6}>
              <Typography>Nom équipe 2</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                value={gameState.nom_team2}
                onChange={handleChange("nom_team2")}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid pb={2} direction="row" alignItems="center" container>
            <Grid item xs={6}>
              <Typography>Nombre de sets</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                value={gameState.option1}
                onChange={handleChange("option1")}
              ></TextField>
            </Grid>
          </Grid>
          <Grid pb={2} direction="row" alignItems="center" container>
            <Grid item xs={6}>
              <Typography>Nombre de points par sets</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                value={gameState.option2}
                onChange={handleChange("option2")}
              ></TextField>
            </Grid>
          </Grid>
          <Grid pb={2} direction="row" alignItems="center" container>
            <Grid item xs={6}>
              <Typography>point dernier set</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                value={gameState.option3}
                onChange={handleChange("option3")}
              ></TextField>
            </Grid>
          </Grid>
        </Box>
        <DialogActions>
          <Button sx={{ color: "secondary.main" }} onClick={saveSettings}>
            Valider
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}

export default VolleyballSetting;
