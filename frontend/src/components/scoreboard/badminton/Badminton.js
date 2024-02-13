import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

import ScoreboardIcon from "@mui/icons-material/Scoreboard";
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

import authService from "../../../services/authService";
import ScoreService from "../../../services/scoreService";
import MacroShortcut from "../MacroShortcut";
import SettingsModal from "./BadmintonSetting";
import modeServiceInstance from "../../../services/modeService";


function Badminton() {
  const [gameState, setGameState] = useState({
    player1: "",
    player2: "",
    numOfSets: "",
    maxSetPoints: "",
    numOfPoints: 0,
    scorePlayer1: 0,
    scorePlayer2: 0,
    setsPlayer1: 0,
    setsPlayer2: 0,
    server: "",
  });
/*   const [timer, setTimer] = useState(0); */
  const [winner, setWinner] = useState("");
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const largeTypo = isMobile ? "h5" : "h4";
  const medTypo = isMobile ? "h6" : "h5";

  useEffect(() => {
    getData().then((data) => {
      setData(data);

      if (!data.max_set_points) {
        initializeSetting(data);
      }
    });
  }, []);

  const getData = async () => {
    const res = await ScoreService.getByUserId();
    const data = res.data[0];
    return data;
  };

  const setData = async (data) => {
    console.log("data02", data);
    setGameState({
      player1: data.nom_team1,
      player2: data.nom_team2,
      numOfSets: data.option1,
      maxSetPoints: data.option3,
      numOfPoints: data.option2,
      scorePlayer1: data.score_team1,
      scorePlayer2: data.score_team2,
      setsPlayer1: data.option4,
      setsPlayer2: data.option5,
      server: data.option7,
    });
  };

  const initializeSetting = async (data) => {
    try {
      const score = {
        option1: 3,
        option2: 21,
        option3: 30,
        option4: null,
        option5: null,
        option6: null,
        option7: data.nom_team1,
        option8: null,
      };
      await ScoreService.updateSettings(
        authService.getCurrentUser().user.id,
        score
      );
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la base de données",
        error
      );
    }
  };

  const checkWinner = async (newScorePlayer1, newScorePlayer2, server) => {
    let newSetsWonPlayer1 = gameState.setsPlayer1;
    let newSetsWonPlayer2 = gameState.setsPlayer2;
    let newServer = server;

    // Mettre à jour le score et le serveur dans la base de données

    const updateDatabase = async () => {
      try {
        await ScoreService.update({
          score_team1: newScorePlayer1,
          score_team2: newScorePlayer2,
          option4: newSetsWonPlayer1,
          option5: newSetsWonPlayer2,
          option7: gameState.server,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de la base de données",
          error
        );
      }
    };
    // Vérification pour le joueur 1
    if (
      newScorePlayer1 >= gameState.numOfPoints &&
      (newScorePlayer1 - newScorePlayer2 >= 2 || newScorePlayer1 === gameState.maxSetPoints)
    ) {
      newSetsWonPlayer1 += 1;
      newScorePlayer1 = 0;
      newScorePlayer2 = 0;
      newServer = gameState.player2;
    }

    // Vérification pour le joueur 2
    else if (
      newScorePlayer2 >= gameState.numOfPoints &&
      (newScorePlayer2 - newScorePlayer1 >= 2 || newScorePlayer2 === gameState.maxSetPoints)
    ) {
      newSetsWonPlayer2 += 1;
      newScorePlayer1 = 0;
      newScorePlayer2 = 0;
      newServer = gameState.player1;
    }

    // Vérifie si nous avons un gagnant
    if (newSetsWonPlayer1 >= gameState.numOfSets) {
      setWinner(gameState.player1);
    } else if (newSetsWonPlayer2 >= gameState.numOfSets) {
      setWinner(gameState.player2);
    }

    // Mettre à jour les états de sets gagnés
    setGameState({
      ...gameState,
      setsPlayer1: newSetsWonPlayer1,
      setsPlayer2: newSetsWonPlayer2,
      scorePlayer1: newScorePlayer1,
      scorePlayer2: newScorePlayer2,
      server: newServer,
    });

    // Mettre à jour les états locaux et la base de données
    await updateDatabase();
  };

  const handleScoreChangePlayer1 = async (increment) => {
    let newScore = gameState.scorePlayer1;
    if (increment) {
      newScore += 1;
    } else if (newScore === 0 && gameState.setsPlayer1 > 0) {
      // Si le score est 0 et qu'il y a au moins un set gagné, réduire le nombre de sets et réinitialiser le score.
      const updatedState = {
        ...gameState,
        setsPlayer1: gameState.setsPlayer1 - 2,
        scorePlayer1: gameState.numOfPoints - 1,
      };
      setGameState(updatedState);
      ScoreService.update({
        score_team1: updatedState.scorePlayer1,
        option4: updatedState.setsPlayer1,
      });
      return;
    } else {
      newScore = Math.max(0, newScore - 1);
    }

    await checkWinner(newScore, gameState.scorePlayer2, gameState.player1);
  };

  const handleScoreChangePlayer2 = async (increment) => {
    let newScore = gameState.scorePlayer2;
    if (increment) {
      newScore += 1;
    } else if (newScore === 0 && gameState.setsPlayer2 > 0) {
      // Si le score est 0 et que le joueur 2 a au moins un set gagné, réduire le nombre de sets et réinitialiser le score.
      const updatedState = {
        ...gameState,
        setsPlayer2: gameState.setsPlayer2 - 1,
        scorePlayer2: gameState.numOfPoints - 1,
      };
      setGameState(updatedState);
      await ScoreService.update({
        score_team2: updatedState.scorePlayer2,
        option5: updatedState.setsPlayer2,
      });
      return;
    } else {
      newScore = Math.max(0, newScore - 1);
    }

    await checkWinner(gameState.scorePlayer1, newScore, gameState.player2);
};


  function changeServer(server) {
    setGameState({ ...gameState, server: server });
    ScoreService.update({
      option7: server,
    });
  }

  const handleOpenSettingsModal = () => {
    setSettingsModalOpen(true);
  };

  const handleCloseSettingsModal = () => {
    setSettingsModalOpen(false);
  };

  const saveSettings = () => {
    ScoreService.update({
      option1: gameState.numOfSets,
      option2: gameState.numOfPoints,
      option3: gameState.maxSetPoints,
    });
    handleCloseSettingsModal();
  };

  const resetGame = async () => {
    console.log("resetGame");
    setWinner("");
    try {
      await ScoreService.update({
        score_team1: 0,
        score_team2: 0,
        option4: 0,
        option5: 0,
        option7: gameState.player1,
      });
      setGameState({
        ...gameState,
        scorePlayer1: 0,
        scorePlayer2: 0,
        setsPlayer1: 0,
        setsPlayer2: 0,
        server: gameState.player1,
      });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la base de données",
        error
      );
    }
  };

  function playScoring() {
    const mode = { mode: "scoring", eventId: null };
    modeServiceInstance.setMode(mode);
  }

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <ScoreboardIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography variant="h6" className="headerTitle">
                Scoreboard
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
                  onClick={handleOpenSettingsModal}
                  sx={{ color: "secondary.main" }}
                />
              </IconButton>
            </Box>
          </Stack>
          <Box className="containerPage" sx={{}}>
            <Grid container direction="row">
              <Grid className="gridItem" item xs={4}>
                <Typography variant={largeTypo}>
                  {gameState.player1}{" "}
                  {winner === gameState.player1 ? "Winner" : null}
                </Typography>
                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Set</Typography>
                    <Typography variant={medTypo}>
                      {gameState.setsPlayer1}
                    </Typography>
                  </Box>
                </Paper>

                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Score</Typography>
                    <Typography variant={medTypo}>
                      {gameState.scorePlayer1}
                    </Typography>
                  </Box>
                </Paper>
                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton onClick={() => handleScoreChangePlayer1(true)}>
                      <AddIcon color="primary" />
                    </IconButton>
                  </Paper>
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor centered"
                  >
                    <IconButton onClick={() => handleScoreChangePlayer1(false)}>
                      <RemoveIcon color="primary" />
                    </IconButton>
                  </Paper>
                </Box>
              </Grid>
              <Grid className="gridItem" item xs={4}>
                <Typography variant={largeTypo} className="hiddenSpace">
                  hidden
                </Typography>

                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton
                      onClick={() => {
                        changeServer(gameState.player1);
                      }}
                    >
                      <WestIcon
                        className={
                          gameState.server === gameState.player1
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
                        changeServer(gameState.player2);
                      }}
                    >
                      <EastIcon
                        className={
                          gameState.server === gameState.player2
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
                    <Typography variant={medTypo}>timer</Typography>
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
              <Grid className="gridItem gridItemPadding" item xs={4}>
                <Typography variant={largeTypo}>
                  {gameState.player2}
                  {winner === gameState.player2 ? "Winner" : null}
                </Typography>
                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Set</Typography>
                    <Typography variant={medTypo}>
                      {gameState.setsPlayer2}
                    </Typography>
                  </Box>
                </Paper>

                <Paper
                  elevation={2}
                  className="itemPaperTypo itemPaperColor centered"
                >
                  <Box className="centered column">
                    <Typography variant={largeTypo}>Score</Typography>
                    <Typography variant={medTypo}>
                      {" "}
                      {gameState.scorePlayer2}
                    </Typography>
                  </Box>
                </Paper>
                <Box className="scoreEditBox centered">
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor buttonEditMargin centered"
                  >
                    <IconButton onClick={() => handleScoreChangePlayer2(true)}>
                      <AddIcon color="primary" />
                    </IconButton>
                  </Paper>
                  <Paper
                    elevation={2}
                    className="buttonEdit itemPaperColor centered"
                  >
                    <IconButton onClick={() => handleScoreChangePlayer2(false)}>
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
      </Grid>

      <SettingsModal
        open={settingsModalOpen}
        onClose={handleCloseSettingsModal}
        saveSettings={saveSettings}
        gameState={gameState}
        setGameState={setGameState}
      />
    </>
  );
}

export default Badminton;
