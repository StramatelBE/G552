import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import WestIcon from "@mui/icons-material/West";
import EastIcon from "@mui/icons-material/East";
import PauseIcon from "@mui/icons-material/Pause";
import EditIcon from "@mui/icons-material/Edit";
import SurroundSoundIcon from "@mui/icons-material/SurroundSound";
import MacroShortcut from "../MacroShortcut";

import ScoreService from "../../../services/scoreService";
import VolleyballSetting from "./VolleyballSetting";
import modeServiceInstance from "../../../services/modeService";

function Volleyball() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const largeTypo = isMobile ? "h5" : "h4";
  const medTypo = isMobile ? "h6" : "h5";
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [gameState, setGameState] = useState({});
  useEffect(() => {
    getData().then((data) => {
      console.log(data);
      setGameState(data);
    });
  }, []);
  /* 
        "option1": "number_of_sets"
        "option2": "points_per_set"
        "option3": "points_last_set"
        "option4": "sets_team1"
        "option5": "sets_team2"
*/
  const getData = async () => {
    const res = await ScoreService.getByUserId();
    const data = res.data[0];
    return data;
  };

  const handleScoreTeam1 = (value) => {
    const newValue = gameState.score_team1 + value;
    if (newValue < 0) return;

    const pointDifference = newValue - gameState.score_team2;

    // Obtenir le score à atteindre, qui peut être différent pour le dernier set
    const scoreToReach =
      gameState.option4 === gameState.finalSetNumber
        ? gameState.option3
        : gameState.option2;

    // Vérifie si le joueur 1 a au moins 2 points d'avance et a atteint le score maximum pour un set
    if (newValue >= scoreToReach && pointDifference >= 2) {
      const newSetTeam1 = gameState.option4 + 1;
      setGameState({
        ...gameState,
        score_team1: 0,
        score_team2: 0,
        option4: newSetTeam1,
      });
      updateDB("score_team1", 0);
      updateDB("score_team2", 0);
      updateDB("option4", newSetTeam1);
      return;
    }
    // Si le joueur n'a pas encore gagné le set, mettez simplement à jour le score
    else {
      setGameState({
        ...gameState,
        score_team1: newValue,
      });
      updateDB("score_team1", newValue);
    }
  };

  const handleScoreTeam2 = (value) => {
    const newValue = gameState.score_team2 + value;
    if (newValue < 0) return;

    const pointDifference = newValue - gameState.score_team1;

    // Obtenir le score à atteindre, qui peut être différent pour le dernier set
    const scoreToReach =
      gameState.set_team2 === gameState.finalSetNumber
        ? gameState.option3
        : gameState.option2;

    // Vérifie si le joueur 2 a au moins 2 points d'avance et a atteint le score maximum pour un set
    if (newValue >= scoreToReach && pointDifference >= 2) {
      const newSetTeam2 = gameState.option5 + 1;
      setGameState({
        ...gameState,
        score_team2: 0,
        score_team1: 0,
        option5: newSetTeam2,
      });
      updateDB("score_team2", 0);
      updateDB("score_team1", 0);
      updateDB("option5", newSetTeam2);
      return;
    }
    // Si le joueur n'a pas encore gagné le set, mettez simplement à jour le score
    else {
      setGameState({
        ...gameState,
        score_team2: newValue,
      });
      updateDB("score_team2", newValue);
    }
  };

  const resetGame = async () => {
    const newGameState = {
      score_team1: 0,
      score_team2: 0,
      option4: 0,
      option5: 0,
    };

    setGameState((prevState) => ({ ...prevState, ...newGameState }));
    for (let key in newGameState) {
      await updateDB(key, newGameState[key]);
    }
  };

  const updateDB = async (nameValue, value) => {
    await ScoreService.update({ [nameValue]: value });
  };

  const toggleSettingModal = () => {
    setIsSettingOpen((prevState) => !prevState);
  };

  function updateServingTeam(server) {
    setGameState({ ...gameState, option7: server });
    updateDB("option7", server);
  }

  function playScoring() {
    const mode = { mode: "scoring", eventId: null };
    modeServiceInstance.setMode(mode);
  }

  return (
    <Grid item xs={12}>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled className="headerButton">
              <SportsVolleyballIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              Tableau de score Volleyball
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton className="headerButton">
              <RestartAltIcon
                onClick={resetGame}
                sx={{ color: "secondary.main" }}
              />
            </IconButton>
            <IconButton className="headerButton">
              <PlayArrowIcon onClick={playScoring} sx={{ color: "secondary.main" }} />
            </IconButton>
            <IconButton className="headerButton">
              <SettingsIcon
                onClick={toggleSettingModal}
                sx={{ color: "secondary.main" }}
              />
            </IconButton>
          </Box>
        </Stack>

        <Box className="containerPage">
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-end"
            direction="row"
            spacing={2}
          >
            <Grid className="gridItem " item xs={4}>
              <Typography variant={largeTypo}>{gameState.nom_team1}</Typography>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Set</Typography>
                  <Typography variant={medTypo}>{gameState.option4}</Typography>
                </Box>
              </Paper>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Score</Typography>
                  <Typography variant={medTypo}>
                    {gameState.score_team1}
                  </Typography>
                </Box>
              </Paper>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                  onClick={() => {
                    handleScoreTeam1(1);
                  }}
                >
                  <IconButton>
                    <AddIcon color="primary" />
                  </IconButton>
                </Paper>

                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor centered"
                  onClick={() => {
                    handleScoreTeam1(-1);
                  }}
                >
                  <IconButton>
                    <RemoveIcon color="primary" />
                  </IconButton>
                </Paper>
              </Box>
            </Grid>

            <Grid className="gridItem" item xs={4}>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit itemPaperColor buttonEditMargin centered"
                >
                  <IconButton
                    onClick={() => {
                      updateServingTeam(gameState.nom_team1);
                    }}
                  >
                    <WestIcon
                      className={
                        gameState.option7 === gameState.nom_team1
                          ? "iconServeurTrue"
                          : "iconServeurFalse"
                      }
                    />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit itemPaperColor centered"
                >
                  <IconButton
                    onClick={() => {
                      updateServingTeam(gameState.nom_team2);
                    }}
                  >
                    <EastIcon
                      className={
                        gameState.option7 === gameState.nom_team2
                          ? "iconServeurTrue"
                          : "iconServeurFalse"
                      }
                    />
                  </IconButton>
                </Paper>
              </Box>
              <Paper
                elevation={2}
                className=" itemPaperColor buttonEdit centered"
                style={{ width: "100%" }}
              >
                <Box className="centered column">
                  <Typography variant={medTypo}>Timer</Typography>
                  <Typography variant={medTypo}>00:00</Typography>
                </Box>
              </Paper>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                >
                  <IconButton>
                    <PlayArrowIcon color="primary" />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                >
                  <IconButton>
                    <PauseIcon color="primary" />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor centered"
                >
                  <IconButton>
                    <EditIcon color="primary" />
                  </IconButton>
                </Paper>
              </Box>
              <Paper
                elevation={2}
                className="buttonEdit itemPaperColor centered"
              >
                <Box className="centered column">
                  <IconButton>
                    <SurroundSoundIcon color="primary" />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>

            <Grid className="gridItem" item xs={4}>
              <Typography variant={largeTypo}>{gameState.nom_team2}</Typography>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Set</Typography>
                  <Typography variant={medTypo}>{gameState.option5}</Typography>
                </Box>
              </Paper>
              <Paper
                elevation={2}
                className="itemPaperTypo itemPaperColor centered"
              >
                <Box className="centered column">
                  <Typography variant={largeTypo}>Score</Typography>
                  <Typography variant={medTypo}>
                    {gameState.score_team2}
                  </Typography>
                </Box>
              </Paper>
              <Box className="scoreEditBox centered">
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor buttonEditMargin centered"
                  onClick={() => {
                    handleScoreTeam2(1);
                  }}
                >
                  <IconButton>
                    <AddIcon color="primary" />
                  </IconButton>
                </Paper>
                <Paper
                  elevation={2}
                  className="buttonEdit buttonEditTimer itemPaperColor centered"
                  onClick={() => {
                    handleScoreTeam2(-1);
                  }}
                >
                  <IconButton>
                    <RemoveIcon color="primary" />
                  </IconButton>
                </Paper>
              </Box>
            </Grid>
          </Grid>
          <Box className="divider" />
          <MacroShortcut />
        </Box>
      </Paper>
      <VolleyballSetting
          open={isSettingOpen}
          onClose={toggleSettingModal}
          gameState={gameState}
          setGameState={setGameState}
          updateDB={updateDB}
      />
    </Grid>
  );
}

export default Volleyball;
