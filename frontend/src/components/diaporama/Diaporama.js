import React from "react";
import EventParam from "./config/DiaporamaConfig";
import EventList from "./list/DiaporamaList";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

function Diaporama(props) {
  const navigate = useNavigate();

  function idEventClick(id) {;
    navigate(`/create/${id}`);
  }

  return (
    <Box>
      {props.id === undefined ? (
        <EventList eventMedia={props.eventMedia} onEventClick={idEventClick} />
      ) : (
        <EventParam
        closeEvent={props.closeEvent}
          updateMedia={props.updateMedia}
          getEvents={props.getEvents}
          eventMedia={props.eventMedia}
          setEventMedia={props.setEventMedia}
          id={props.id}
          isDragging={props.isDragging}
          onEventClick={idEventClick}
        />
      )}
    </Box>
  );
}

export default Diaporama;
