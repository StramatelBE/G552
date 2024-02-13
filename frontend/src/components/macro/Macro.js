import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import KeyboardIcon from "@mui/icons-material/Keyboard";

import eventService from "../../services/eventService";
import macroService from "../../services/macroService";

function Macro() {
  const { t } = useTranslation();
  const [macros, setMacros] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvent();
    getMacro();
  }, []);

  function getEvent() {
    eventService.get().then((result) => {
      setEvents(result);
    });
  }

  function getMacro() {
    macroService.getById().then((result) => {
      console.log(result);
      const sortedData = result.sort((a, b) => a.button_id - b.button_id);
      const updatedDataWithIndex = sortedData.map((macro, index) => {
        return {
          ...macro,
          originalIndex: index,
          event_id: macro.event_id || 0,
        };
      });
      setMacros(updatedDataWithIndex);
    });
  }

  async function updateMacro(macro) {
    if (macro.event_id === "choisir event") {
      macro.event_id = null;
    }
    /*  macroService.update(macro).then((result) => {}); */
    await macroService.update(macro);
  }

  const ignoreMacrosIds = [0, 1, 2, 10, 11, 12, 13, 14];

  return (
    <Grid item>
      <Paper className="mainPaperPage">
        <Stack className="headerTitlePage">
          <Box className="headerLeft">
            <IconButton>
              <KeyboardIcon sx={{ color: "primary.light" }} />
            </IconButton>
            <Typography variant="h6" className="headerTitle">
              {t("Macro.title")}
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Box className="containerPage" sx={{ paddingTop: "0" }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("Macro.number")}</TableCell>
                  <TableCell align="right">{t("Macro.slideshow")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {macros
                  ? macros
                      .filter(
                        (macro) => !ignoreMacrosIds.includes(macro.button_id)
                      )
                      .map((macro) => (
                        <TableRow key={macro.button_id}>
                          <TableCell>{macro.button_id}</TableCell>
                          <TableCell align="right">
                            <Select
                              sx={{ width: "30vh" }}
                              align="left"
                              value={macro.event_id || "choisir event"}
                              onChange={(e) => {
                                const updatedData = macros.map((item) => {
                                  if (
                                    macro.originalIndex === item.originalIndex
                                  ) {
                                    updateMacro({
                                      ...item,
                                      event_id: e.target.value,
                                    });
                                    return {
                                      ...item,
                                      event_id: e.target.value,
                                    };
                                  }
                                  return item;
                                });
                                setMacros(updatedData);
                              }}
                            >
                              <MenuItem value="choisir event">
                                {t("Macro.none")}
                              </MenuItem>
                              {events &&
                                events.map((event) => (
                                  <MenuItem key={event.id} value={event.id}>
                                    {event.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))
                  : null}
              </TableBody>
            </Table>
          </Box>
        </Stack>
      </Paper>
    </Grid>
  );
}

export default Macro;
