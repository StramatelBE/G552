import React, { useEffect, useState } from "react";

import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  Typography,
  Slider,
  LinearProgress,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import PermMediaIcon from "@mui/icons-material/PermMedia";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LockIcon from "@mui/icons-material/Lock";
import StorageIcon from "@mui/icons-material/Storage";
import BugReportIcon from "@mui/icons-material/BugReport";
import PhoneIcon from "@mui/icons-material/Phone";
import LanguageIcon from "@mui/icons-material/Language";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";

import { useDarkMode } from "../../contexts/DarkModeContext";
import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";
import authService from "../../services/authService";
import paramService from "../../services/paramService";
import veilleService from "../../services/veilleService";
import LanguageSelector from "../common/LanguageSelector";

import modeServiceInstance from "../../services/modeService";

function Profile() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("John Doe");
  const [modalOpen, setModalOpen] = useState(false);
  const [param, setParam] = useState({});
  const [veille, setVeille] = useState({});
  const totalSize = 100; // Taille totale en Go
  const usedSize = 90; // Taille utilisée en Go
  const [user, setUser] = useState(null);
  const { darkMode, setDarkMode } = useDarkMode();
  const [mode, setMode] = useState({});

  useEffect(() => {
    modeServiceInstance.getMode().then((data) => {
      console.log("data", data.mode);
      setMode(data.mode);
    });
  }, []);
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  function setModeTest(mode) {
    const datamode = { event_id: null, mode: mode };
    modeServiceInstance.setMode(datamode).then((data) => {
      console.log("data", data);
      setMode(mode);
    });
  }

  useEffect(() => {
    if (user) {
      setUsername(user.user.username);
      paramService.getByUserId(user.user.id).then((paramData) => {
        const paramDataItem = paramData?.[0] || {};
        setParam(paramDataItem);

        // Mettre à jour l'état avec les données de param
        veilleService
          .getByUserId(paramDataItem.veille_id)
          .then((veilleData) => {
            console.log("veilleData", veilleData);
            setVeille(veilleData || {});

            // Mettre à jour l'état avec les données de veille
          });
      });
    }
  }, [user]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const setIsDarkMode = () => {
    setDarkMode((prevDarkMode) => {
      localStorage.setItem("darkMode", !prevDarkMode);
      return !prevDarkMode;
    });
  };

  const handleEventAutoChange = (event) => {
    const updatedParam = { ...param, event_auto: event.target.checked ? 1 : 0 };
    setParam(updatedParam);
    paramService.update(updatedParam).then((response) => {});
  };

  const handleVeilleChange = (event) => {
    const updatedVeille = { ...veille, enable: event.target.checked ? 1 : 0 };
    setVeille(updatedVeille);
    veilleService.update(updatedVeille).then((response) => {});
  };

  function updatedVeille01(veille) {
    setVeille(veille);
    console.log(veille);
    veilleService.update(veille).then((response) => {
      console.log(response);
    });
  }

  const handleSliderChange = (event, newValue) => {
    const updatedVeille = {
      ...veille,
      start_time: newValue[0],
      end_time: newValue[1],
    };
    setVeille(updatedVeille);
    veilleService.update(updatedVeille).then((response) => {});
  };

  const percentage = (usedSize / totalSize) * 100;

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <SettingsIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ color: "text.primary" }}
                className="headerTitle"
              >
                {t("Profile.title")}
              </Typography>
            </Box>
          </Stack>
          <Box
            className="containerPage"
            sx={{
              paddingLeft: { xs: 2, sm: 6 },
              paddingRight: { xs: 2, sm: 6 },
            }}
          >
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    {t("Profile.application")}
                  </Typography>
                  <Stack
                    onClick={toggleModal}
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <IconButton disabled>
                      <LockIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                    <Typography
                      variant="h8"
                      sx={{
                        color: "text.primary",
                        textTransform: "none",
                        padding: "0",
                      }}
                    >
                      {t("Profile.changePassword")}
                    </Typography>
                  </Stack>
                  <Stack
                    onClick={setIsDarkMode}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <DarkModeIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        {t("Profile.darkMode")}
                      </Typography>
                    </Stack>
                    <Switch checked={darkMode} color="secondary" />
                  </Stack>
                  <Stack
                    onClick={toggleModal}
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <IconButton disabled>
                      <StorageIcon sx={{ color: "text.secondary" }} />
                    </IconButton>

                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        {t("Profile.usedStorageSpace")}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        color={percentage > 80 ? "error" : "secondary"}
                      />
                    </Box>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <BugReportIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        {t("Profile.panelsTest")}
                      </Typography>
                    </Stack>
                    {mode && mode === "test" ? (
                      <IconButton
                        sx={{ p: 0 }}
                        size="big"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModeTest(null);
                        }}
                      >
                        <StopIcon sx={{ color: "secondary.main" }} />
                        <CircularProgress
                          size={20}
                          sx={{
                            left: 1.2,
                            position: "absolute",
                            color: "secondary.main",
                          }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        sx={{ p: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModeTest("test");
                        }}
                      >
                        <PlayArrowIcon
                          sx={{ fontSize: 30, color: "secondary.main" }}
                        />
                      </IconButton>
                    )}
                  </Stack>

                  <Stack
                    justifyContent="space-between"
                    direction="row"
                    alignItems="center"
                    spacing={3}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <LanguageIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography variant="h8" sx={{ color: "text.primary" }}>
                        {t("Profile.languages")}
                      </Typography>
                    </Stack>
                    <LanguageSelector />
                  </Stack>
                </Stack>
                <Stack spacing={2}>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, color: "text.secondary" }}
                  >
                    {t("info")}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <IconButton disabled>
                      <PhoneIcon sx={{ color: "text.secondary" }} />
                    </IconButton>
                    <Typography variant="h8" sx={{ color: "text.primary" }}>
                      +33 (0) 2 40 25 46 90
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid
                /*   style={{
                  paddingTop: "15px"
                }} */
                item
                xs={12}
                sm={6}
              >
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    {t("Profile.account")}
                  </Typography>
                  {/* <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                    onClick={handleEventAutoChange}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <PermMediaIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography> {t("autoEvent")}</Typography>
                    </Stack>
                    <Switch
                      color="secondary"
                      checked={param.event_auto === 1}
                    />
                  </Stack> */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                    onClick={handleVeilleChange}
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <ModeNightIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography> {t("Profile.automaticStandby")}</Typography>
                    </Stack>
                    <Switch
                      color="secondary"
                      checked={veille.enable === 1}
                      onChange={handleVeilleChange}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={3}
                    /*  onClick={handleVeilleChange} */
                  >
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <ModeNightIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography>heure de restart:</Typography>
                    </Stack>
                    {/* textinput */}
                    {/* to int */}
                    <TextField
                      type="text"
                      value={veille.restart_at}
                      onChange={(e) => {
                        const updatedVeille = {
                          ...veille,
                          restart_at: parseInt(e.target.value),
                        };
                        updatedVeille01(updatedVeille); // Assuming setVeille is the state setter function for 'veille'
                      }}
                      required
                      margin="normal"
                    />
                  </Stack>
                  <Stack>
                    <Slider
                      m={5}
                      color="secondary"
                      value={[veille.start_time, veille.end_time]}
                      min={0}
                      max={24}
                      step={1}
                      marks={[
                        { value: 0, label: "0h" },
                        { value: 6, label: "6h" },
                        { value: 12, label: "12h" },
                        { value: 18, label: "18h" },
                        { value: 24, label: "24h" },
                      ]}
                      valueLabelDisplay="auto"
                      onChange={handleSliderChange}
                      disabled={veille.enable === 0}
                    />
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <ChangePasswordDialog open={modalOpen} onClose={toggleModal} />
    </>
  );
}

export default Profile;
