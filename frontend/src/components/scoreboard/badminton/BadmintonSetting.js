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


function SettingsModal(props) {
  const { gameState, setGameState, saveSettings, open, onClose } = props;

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setGameState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

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
                value={gameState.player1}
                onChange={handleChange("player1")}
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
                value={gameState.player2}
                onChange={handleChange("player2")}
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
                value={gameState.numOfSets}
                onChange={handleChange("numOfSets")}
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
                value={gameState.numOfPoints}
                onChange={handleChange("numOfPoints")}
              ></TextField>
            </Grid>
          </Grid>
          <Grid pb={2} direction="row" alignItems="center" container>
            <Grid item xs={6}>
              <Typography>score maximum d'un set</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                value={gameState.maxSetPoints}
                onChange={handleChange("maxSetPoints")}
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

export default SettingsModal;
