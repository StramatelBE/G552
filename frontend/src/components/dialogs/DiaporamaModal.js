import React from "react";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

import PauseIcon from "@mui/icons-material/Pause";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";

import "react-responsive-carousel/lib/styles/carousel.min.css";

function DiaporamaModal(props) {
  const { t } = useTranslation();
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          backgroundColor: "primary.main",
          height: "100%",
        }}
      >
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton>
              <PlayArrowIcon
                sx={{ color: "primary.light" }}
                className="headerButton"
              />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ color: "text.primary" }}
              className="headerTitle"
            >
              {t("Diaporama.listTitle")}
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton onClick={props.onClose}>
              <CloseIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Box>
        </Stack>

        <Box
          sx={{
            height: "96%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {props.currentMedia &&
            (props.currentMedia.type === "image" ? (
              <Box
                component="img"
                sx={{
                  width: "100%",
                  height: "85%",
                  objectFit: "contain",
                }}
                src={props.currentMedia.path}
                alt={`${t("Media.title")} ${props.activeMediaIndex}`}
              />
            ) : props.currentMedia.type === "video" ? (
              <Box
                component="video"
                sx={{
                  width: "100%",
                  height: "85%",
                  objectFit: "contain",
                }}
                src={props.currentMedia.path}
                controls
              />
            ) : null)}
          <Box sx={{ textAlign: "center", marginTop: "16px", display: "flex" }}>
            <>
              <IconButton onClick={props.handlePreviousSlide}>
                <NavigateBeforeIcon sx={{ color: "secondary.main" }} />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  padding: 1,
                  color: "text.secondary",
                }}
              >
                {t("Diaporama.title")} {props.activeMediaIndex + 1} /
                {props.eventMedia[0].medias.length}
              </Typography>
              <IconButton onClick={props.handleNextSlide}>
                <NavigateNextIcon sx={{ color: "secondary.main" }} />
              </IconButton>
            </>

            <IconButton variant="contained" onClick={props.toggleAutoPlay}>
              {props.isAutoPlayEnabled ? (
                <>
                  <PauseIcon sx={{ color: "secondary.main" }} />
                </>
              ) : (
                <>
                  <PlayArrowIcon sx={{ color: "secondary.main" }} />
                </>
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default DiaporamaModal;
