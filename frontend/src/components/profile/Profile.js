import React, { useEffect, useState } from "react";
import {
  Box, Button, CircularProgress, Grid, IconButton, Paper, Stack, Switch, TextField, Typography
} from "@mui/material";
import { useTranslation } from "react-i18next";

import BugReportIcon from "@mui/icons-material/BugReport";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LanguageIcon from "@mui/icons-material/Language";
import LockIcon from "@mui/icons-material/Lock";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import PhoneIcon from "@mui/icons-material/Phone";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SettingsIcon from "@mui/icons-material/Settings";
import StopIcon from "@mui/icons-material/Stop";
import StorageIcon from "@mui/icons-material/Storage";

import { useDarkMode } from "../../contexts/DarkModeContext";
import paramService from "../../services/paramService";
import veilleService from "../../services/veilleService";
import LanguageSelector from "../common/LanguageSelector";
import ChangePasswordDialog from "../dialogs/ChangePasswordDialog";

import modeServiceInstance from "../../services/modeService";
import spaceService from "../../services/spaceService";
import useAuthStore from "../../stores/authStore";

function Profile() {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [param, setParam] = useState({});
  const [veille, setVeille] = useState({});
  const [editRestartAt, setEditRestartAt] = useState("");
  const totalSize = 100; // Total size in GB
  const usedSize = 90; // Used size in GB
  const [user, setUser] = useState(null);
  const { darkMode, setDarkMode } = useDarkMode();
  const [mode, setMode] = useState({});
  const [sportsData, setSportsData] = useState([]);

  useEffect(() => {
    modeServiceInstance.getMode().then(data => {
      setMode(data.mode);
    });

    spaceService.getSpace().then(data => {
      const calculatedData = Object.entries(data).filter(([key]) => key !== 'Total').map(([sport, size]) => ({
        name: sport,
        color: getRandomColor(),
        width: (size / data.Total) * 100,
      }));
      setSportsData(calculatedData);
    }).catch(error => {
      console.error("Error fetching space data:", error);
    });

    const currentUser = useAuthStore.getState().user;
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (user) {
      paramService.getByUserId(user.id).then(paramData => {
        const paramDataItem = paramData?.[0] || {};
        setParam(paramDataItem);
        veilleService.getByUserId(paramDataItem.veille_id).then(veilleData => {
          setVeille(veilleData || {});
          setEditRestartAt(veilleData?.restart_at || "");
        });
      });
    }
  }, [user]);

  function getRandomColor() {
    const letters = '012233445566778899AABBCCCDEEFF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const handleRestartAtChange = (e) => {
    setEditRestartAt(e.target.value);
  };

  const submitVeilleUpdate = () => {
    if (!editRestartAt.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      alert("Please enter a valid time.");
      return;
    }
    const updatedVeille = { ...veille, restart_at: editRestartAt };
    veilleService.update(updatedVeille).then(() => {
      setVeille(updatedVeille);
      alert("Veille time updated successfully.");
    }).catch(error => {
      console.error("Error updating veille time:", error);
      alert("Failed to update veille time.");
    });
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const setIsDarkMode = () => {
    setDarkMode(prevDarkMode => {
      localStorage.setItem("darkMode", !prevDarkMode);
      return !prevDarkMode;
    });
  };

  return (
    <>
      <Grid item xs={12}>
        <Paper className="mainPaperPage">
          <Stack className="herderTitlePage">
            <Box className="headerLeft">
              <IconButton disabled className="headerButton">
                <SettingsIcon sx={{ color: "primary.light" }} />
              </IconButton>
              <Typography variant="h6" sx={{ color: "text.primary" }} className="headerTitle">
                {t("Profile.title")}
              </Typography>
            </Box>
          </Stack>
          <Box className="containerPage" sx={{ paddingLeft: { xs: 2, sm: 6 }, paddingRight: { xs: 2, sm: 6 } }}>
            <Grid container spacing={6}>
              <Grid item xs={12} sm={6}>
                {/* Other components remain unchanged */}
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Typography variant="h6" sx={{ color: "text.secondary" }}>
                    {t("Profile.account")}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={3}>
                    <Stack spacing={3} direction="row" alignItems="center">
                      <IconButton disabled>
                        <ModeNightIcon sx={{ color: "text.secondary" }} />
                      </IconButton>
                      <Typography>{t("Profile.restartTime")}:</Typography>
                    </Stack>
                    <TextField
                      type="time"
                      value={editRestartAt}
                      onChange={handleRestartAtChange}
                      required
                      margin="normal"
                      inputProps={{
                        step: 300, // 5 minutes steps for time selection
                      }}
                    />
                    <Button onClick={submitVeilleUpdate} variant="contained" color="primary">
                      Update
                    </Button>
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
