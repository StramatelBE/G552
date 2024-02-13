import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import eventService from "../../../services/eventService";
import modeService from "../../../services/modeService";
import AddEventDialog from "../../dialogs/AddEventDialog";
import DeleteEventDialog from "../../dialogs/DeleteEventDialog";

function DiaporamaList({ onEventClick }) {
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [event, setEvent] = useState(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [mode, setMode] = useState(null);

  const { t } = useTranslation();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  useEffect(() => {
    getEvent();
    getMode();
  }, []);

  async function getEvent() {
    try {
      const result = await eventService.get();
      setEvent(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function getMode() {
    try {
      const result = await modeService.getMode();
      setMode(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteEvent() {
    try {
      await eventService.delete(eventToDelete.id);
      closeDeleteDialog();
      getEvent();
    } catch (error) {
      console.error("Erreur lors de la suppression d'un événement :", error);
    }
  }
  async function addEvent() {
    try {
      await eventService.create(name).then((result) => {
        setEvent(result);
      });
      toggleModal();
      getEvent();
      setName("");
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un événement :", error);
    }
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function handleRowHover(rowId) {
    if (rowId === hoveredRow) {
      setHoveredRow(null);
    } else {
      setHoveredRow(rowId);
    }
  }

  function openDeleteDialog(event) {
    setDeleteDialogOpen(true);
    setEventToDelete(event);
  }

  function closeDeleteDialog() {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
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

  return (
    <Box>
      <Paper className="mainPaperPage">
        <Stack className="herderTitlePage">
          <Box className="headerLeft">
            <IconButton disabled className="headerButton">
              <PermMediaIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              {t("Diaporama.listTitle")}
            </Typography>
          </Box>
          <Box className="headerRight">
            <IconButton className="headerButton" onClick={toggleModal}>
              <AddIcon sx={{ color: "secondary.main" }} />
            </IconButton>
          </Box>
        </Stack>

        {event && event.length ? (
          <Box className="containerPage">
            {event.map((row) => (
              <Table size="big" key={row.id}>
                <TableBody>
                  <TableRow
                    {...(isMobile
                      ? { onClick: () => handleRowHover(row.id) }
                      : {
                          onMouseEnter: () => handleRowHover(row.id),
                          onMouseLeave: () => handleRowHover(null),
                        })}
                    hover
                    onClick={() => onEventClick(row.id)}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell sx={{ p: 0 }} align="right">
                      {(hoveredRow === row.id || isMobile) && (
                        <>
                          <IconButton
                            sx={{ pr: 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              openDeleteDialog(row);
                            }}
                          >
                            <DeleteIcon
                              sx={{ fontSize: 15, color: "secondary.main" }}
                            />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ))}
          </Box>
        ) : (
          <Box className="infoPage">
            <Typography sx={{ color: "text.secondary" }}>
              {t("Diaporama.emptyListMessage")}
            </Typography>
          </Box>
        )}
      </Paper>
      <DeleteEventDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={deleteEvent}
        eventName={eventToDelete && eventToDelete.name}
      />
      <AddEventDialog
        open={modalOpen}
        onClose={toggleModal}
        onAdd={addEvent}
        name={name}
        setName={setName}
      />
    </Box>
  );
}

export default DiaporamaList;
