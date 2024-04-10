import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
  MenuItem,
  Menu
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import eventMediaService from "../../../services/eventMediaService";
import eventService from "../../../services/eventService";
import {
  default as modeService,
  default as modeServiceInstance,
} from "../../../services/modeService";
import DeleteEventDialog from "../../dialogs/DeleteEventDialog";
import DeleteMediaEventDialog from "../../dialogs/DeleteMediaEventDialog";
import DiaporamaModal from "../../dialogs/DiaporamaModal";
import DiaporamaMedia from "../media/DiaporamaMedia";

function DiaporamaConfig(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [event, setEvent] = useState({});
  const [deleteMediaDialogOpen, setDeleteMediaDialogOpen] = useState(false);
  const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);
  const [isPlayModalOpen, setIsPlayModalOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [idEventMediaDelete, setIdEventMediaDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [mode, setMode] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    props.getEvents();
    getMediasByID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getMode();
  }, []);

  async function getMode() {
    try {
      const result = await modeServiceInstance.getMode();
      setMode(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    var sortedMedias = "";
    if (props.eventMedia[0]?.medias.length > 0) {
      sortedMedias = props.eventMedia[0]?.medias.sort(
        (a, b) => a.media_pos_in_event - b.media_pos_in_event
      );
    }

    if (activeMediaIndex < sortedMedias.length) {
      setCurrentMedia(sortedMedias[activeMediaIndex]);
      if (isAutoPlayEnabled) {
        const timer = setTimeout(() => {
          if (activeMediaIndex === sortedMedias.length - 1) {
            setActiveMediaIndex(0);
          } else {
            setActiveMediaIndex((prevIndex) => prevIndex + 1);
          }
        }, sortedMedias[activeMediaIndex].media_dur_in_event * 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [props.eventMedia, isAutoPlayEnabled, activeMediaIndex]);

  async function getMediasByID() {
    try {
      const result = await eventService.getById(props.id);
      setEvent(result);
      props.getEvents();
    } catch (error) {
      console.error("Erreur lors de la récupération des médias :", error);
    }
  }

  function handlePreviousSlide() {
    if (activeMediaIndex === 0) {
      setActiveMediaIndex(props.eventMedia[0].medias.length - 1);
    } else {
      console.log((prevIndex) => prevIndex - 1);
      setActiveMediaIndex((prevIndex) => prevIndex - 1);
    }
  }

  function handleNextSlide() {
    if (activeMediaIndex === props.eventMedia[0].medias.length - 1) {
      setActiveMediaIndex(0);
    } else {
      setActiveMediaIndex((prevIndex) => prevIndex + 1);
    }
  }

  function toggleAutoPlay() {
    setIsAutoPlayEnabled((prevState) => !prevState);
  }

  function handleRowHover(rowId) {
    setHoveredRow(rowId);
  }

  function openDeleteEventDialog() {
    setDeleteEventDialogOpen(true);
  }

  function closeDeleteEventDialog() {
    setDeleteEventDialogOpen(false);
  }

  function openDeleteDialog(index) {
    setDeleteMediaDialogOpen(true);
    setIdEventMediaDelete(index);
  }

  function closeDeleteDialog() {
    setDeleteMediaDialogOpen(false);
    setIdEventMediaDelete(null);
  }

  function openPlayModal() {
    setIsPlayModalOpen(true);
  }

  function closePlayModal() {
    setIsPlayModalOpen(false);
  }

  async function deleteEventMedia() {
    const eventMediaDelete = props.eventMedia[0].medias[idEventMediaDelete].id;
    console.log(props.eventMedia[0].medias[idEventMediaDelete]);
    try {
      await eventMediaService.delete(eventMediaDelete);
      await getMediasByID();
      closeDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteEvent() {
    try {
      await eventService.delete(event.id);
      closeDeleteDialog();
      navigate("/create");
    } catch (error) {
      console.error("Erreur lors de la suppression d'un événement :", error);
    }
  }

  function closeEvent() {
    props.closeEvent();
  }

  function stopEvent() {
    const mode = { event_id: null, mode: null };
    try {
      modeService.setMode(mode);
      setMode(mode);
    } catch (error) {
      console.error("Erreur lors de la suppression d'un événement :", error);
    }
  }

  function startEvent(event) {
    console.log(event);
    const mode = { event_id: event.id, mode: "diaporama" };
    try {
      modeService.setMode(mode);
      setMode(mode);
    } catch (error) {
      console.error("Erreur lors de la suppression d'un événement :", error);
    }
  }
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  function addPanel() {
    console.log("test", props.id);
    eventMediaService.addPanel(props.id, props.eventMedia[0].medias.length).then((res) => {

      getMediasByID();
      handleCloseMenu();

    });

  }

  return (
    <Box>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton
              className="headerButton"
              onClick={() => {
                props.onEventClick("");
                closeEvent();
              }}
            >
              <CloseIcon sx={{ color: "secondary.main" }} />
            </IconButton>
            <IconButton disabled className="headerButton">
              <PermMediaIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography
              className="headerTitle"
              variant="h6"
              sx={{ color: "text.primary" }}
            >
              {/* {t("diaporama")}:  */}
              {event && event.name}
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleOpenMenu}
              className="headerButton"
            >
              <AddIcon sx={{ color: "secondary.main" }} />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={addPanel}>Panneau</MenuItem>
            </Menu>
            <IconButton
              className="headerButton"
              onClick={openDeleteEventDialog}
            >
              <DeleteIcon sx={{ color: "secondary.main" }} />
            </IconButton>
            {props.eventMedia[0]?.medias.length > 0 ? (
              <IconButton className="headerButton" onClick={openPlayModal}>
                <SlideshowIcon sx={{ color: "secondary.main" }} />
              </IconButton>
            ) : (
              <IconButton disabled={true}>
                <SlideshowIcon />
              </IconButton>
            )}
          </Box>
        </Stack>

        <Droppable droppableId={`${props.eventMedia[0]?.id}`}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {props.eventMedia[0]?.medias.length ? (
                <Box className="containerPage">
                  <TableContainer>
                    <Table
                      sx={{ borderCollapse: "separate", borderSpacing: 0 }}
                    >
                      <TableBody>
                        {props.eventMedia[0].medias.map((item, index) => (
                          <DiaporamaMedia
                            updateMedia={props.updateMedia}
                            handleRowHover={handleRowHover}
                            openDeleteDialog={openDeleteDialog}
                            hoveredRow={hoveredRow}
                            key={item.id}
                            index={index}
                            item={item}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : (
                <Box className="infoPage">
                  <Typography sx={{ color: "text.secondary" }}>
                    {t("Diaporama.emptyListMessage")}
                  </Typography>
                </Box>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>

      <DiaporamaModal
        open={isPlayModalOpen}
        onClose={closePlayModal}
        currentMedia={currentMedia}
        activeMediaIndex={activeMediaIndex}
        handlePreviousSlide={handlePreviousSlide}
        eventMedia={props.eventMedia}
        toggleAutoPlay={toggleAutoPlay}
        handleNextSlide={handleNextSlide}
        isAutoPlayEnabled={isAutoPlayEnabled}
      />
      <DeleteEventDialog
        open={deleteEventDialogOpen}
        onClose={closeDeleteEventDialog}
        onDelete={deleteEvent}
        eventName={event.name}
      />

      <DeleteMediaEventDialog
        open={deleteMediaDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={deleteEventMedia}
      />
    </Box>
  );
}

export default DiaporamaConfig;
