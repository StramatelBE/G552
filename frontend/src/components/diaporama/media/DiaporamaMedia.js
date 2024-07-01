import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, TableCell, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useTheme } from '@mui/material/styles';
function DiaporamaMedia(props) {
  function handleDurationChange(event) {
    props.updateMedia(event.target.value, props.index);
  }
  const theme = useTheme()
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return (
    <Draggable draggableId={props.item.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <TableRow
        sx={{ backgroundColor: props.index % 2 === 0 ? theme.palette.background : theme.palette.action.hover }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          {...(isMobile
            ? {
              onClick: () => props.handleRowHover(props.item.id),
            }
            : {
              onMouseEnter: () => props.handleRowHover(props.item.id),
              onMouseLeave: () => props.handleRowHover(null),
            })}
          hover
          key={props.item.id}
        >
          <TableCell
            sx={{ borderBottom: 0, p: 0, textAlign: "center" }}
          >
            {props.item.type === "video" ? (
              <Box
                component="video"
                sx={{
                  minHeight: "calc(9vh)",
                  minWidth: "calc(15vh)",
                  maxWidth: "calc(15vh)",
                  maxHeight: "calc(9vh)",
                }}
                alt={props.item.title}
                src={props.item.path}
              />
            ) : props.item.type === "image" ? (
              <Box
                sx={{
                  minHeight: "calc(9vh)",
                  minWidth: "calc(15vh)",
                  maxWidth: "calc(15vh)",
                  maxHeight: "calc(9vh)",
                }}
                src={props.item.path}
                alt={props.item.title}
                component="img"
              />
            ) : (<Box

            > Panneau</Box>)}
          </TableCell>
          <TableCell>

            {props.item.originalFileName}
          </TableCell>
          <TableCell p={0} align="right">
            <TextField
              value={props.item.media_dur_in_event}
              onChange={handleDurationChange}
              size="small"
              type="number"
              inputProps={{ min: 0, max: 999 }}
              disabled={props.item.type === "video"}
              style={{ width: "90px" }}
            />
            <Typography variant="caption" display="block" gutterBottom>
              secondes
            </Typography>
          </TableCell>
          <TableCell p={0} align="right">
            {props.hoveredRow === props.item.id ? (
              <IconButton
                sx={{ p: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  props.openDeleteDialog(props.index);
                }}
              >
                <DeleteIcon sx={{ color: "secondary.main" }} />
              </IconButton>
            ) : (
              <IconButton sx={{ p: 0, opacity: 0 }} >
                <DeleteIcon />
              </IconButton>
            )}
          </TableCell>
          {provided.placeholder}
        </TableRow>
      )}
    </Draggable>
  );
}

export default DiaporamaMedia;
