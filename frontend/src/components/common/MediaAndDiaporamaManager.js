import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { v4 as uuidv4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";

import Media from "../media/Media";
import Diaporama from "../diaporama/Diaporama";
import UploadService from "../../services/uploadService";
import authService from "../../services/authService";
import EventMediaService from "../../services/eventMediaService";

function MediaAndDiaporamaManager() {
  const uploadService = UploadService();

  const [isDragging, setIsDragging] = useState(false);
  const [eventMedia, setEventMedia] = useState([
    {
      id: 0,
      title: "eventMedia",
      medias: [],
    },
    {
      id: 1,
      title: "uploadMedia",
      medias: [],
    },
  ]);

  const { id } = useParams();

  useEffect(() => {
    getEvents();
    getMedias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  function updateMedia(nouveauTemps, pos) {
    setEventMedia((prevState) => {
      return prevState.map((colonne) => {
        if (colonne.id === 0) {
          const nouveauxMedias = colonne.medias.map((media, index) => {
            if (index === pos) {
              // Mettre à jour la durée du média dans la base de données
              EventMediaService.updateDuration({
                eventId: id,
                mediaId: media.idBdd,
                duration: nouveauTemps,
              })
                .then((result) => {
                  console.log("Durée du média mise à jour:", result);
                })
                .catch((error) => {
                  console.error(
                    "Erreur lors de la mise à jour de la durée du média:",
                    error
                  );
                });

              return { ...media, media_dur_in_event: nouveauTemps };
            }
            return media;
          });
          return { ...colonne, medias: nouveauxMedias };
        }
        return colonne;
      });
    });
  }

  function getEvents() {
    let newMedias;
    if (id !== undefined) {
      EventMediaService.getAllByEvent(id).then((result) => {
        newMedias = result.map((media) => {
          return { ...media, id: media.event_media_id, idBdd: media.id };
        });

        // Trier les médias en fonction de media_pos_in_event
        newMedias.sort((a, b) => a.media_pos_in_event - b.media_pos_in_event);
        setEventMedia((prevState) => {
          return prevState.map((column) => {
            if (column.id === 0) {
              return { ...column, medias: newMedias };
            }
            return column;
          });
        });
      });
    }
  }

  async function getMedias() {
    try {
      const result = await uploadService.get();
      if (Array.isArray(result)) {
        const newMedias = result.map(media => ({
          ...media,
          id: uuidv4(), 
          idBdd: media.id
        }));
  
        setEventMedia(prevState => prevState.map(column => {
          return column.id === 1 ? { ...column, medias: newMedias } : column;
        }));
      }
    } catch (error) {
      console.error("An error occurred while fetching medias:", error);
    }
  }

  
  function closeEvent() {
    setEventMedia((prevState) => {
      return prevState.map((column) => {
        if (column.id === 0) {
          return { ...column, medias: {} };
        }
        return column;
      });
    });
  }
  const onDragStart = () => {
    setIsDragging(true);
  };
  const onDragEnd = (result) => {
    setIsDragging(false);
    const { destination, source } = result;
    if (!destination) {
      // Si l'élément multimédia n'est pas déposé dans une colonne
      return;
    }
    const start = eventMedia[source.droppableId];

    switch (source.droppableId) {
      case destination.droppableId:
        // Déplacer un élément multimédia dans la même colonne
        console.log("eventMedia", eventMedia[0].medias);
        /*  console.log("meme colonne"); */
        const newMedias = Array.from(start.medias);
        newMedias.splice(source.index, 1);
        newMedias.splice(
          destination.index,
          0,
          eventMedia[source.droppableId].medias[source.index]
        );

        setEventMedia((prevState) => {
          const updatedMedias = newMedias.map((media, index) => ({
            ...media,
            media_pos_in_event: index + 1,
          }));

          return prevState.map((column) => {
            if (column.id === start.id) {
              return { ...column, medias: updatedMedias };
            }
            return column;
          });
        });

        const updatesAfterMove = newMedias.map((media, index) => ({
          event_media_id: media.event_media_id,
          media_pos_in_event: index + 1,
        }));

        EventMediaService.update(updatesAfterMove)
          .then((updateResult) => {
            console.log("Media positions updated:", updateResult);
            getEvents();
          })
          .catch((error) => {
            console.error("Error updating media positions:", error);
          });

        break;

      case "1":
        // Déplacer un élément multimédia dans la colonne des éléments multimédias
        const sourceClone = Array.from(eventMedia[1].medias);
        const destClone = Array.from(
          eventMedia[destination.droppableId].medias
        );
        const item = sourceClone[source.index];
        destClone.splice(destination.index, 0, { ...item, id: uuidv4() });

        // Triez destClone en fonction de media_pos_in_event
        destClone.sort((a, b) => a.media_pos_in_event - b.media_pos_in_event);
        const updates = destClone.map((media, index) => {
          return {
            event_media_id: media.event_media_id,
            media_pos_in_event: index + 1,
          };
        });
        // Appel à la méthode create() pour ajouter le nouvel élément multimédia
        console.log("item", item);
        EventMediaService.create({
          mediaId: item.idBdd,
          eventId: id,
          duration: 1,
          userId: authService.getCurrentUser().user.id,
          media_pos_in_event: destination.index + 1,
        }).then((createResult) => {
          // Une fois que la promesse create() est résolue, appel à la méthode update() pour mettre à jour les positions des éléments multimédias
          EventMediaService.update(updates)
            .then(() => {
              getEvents();
            })
        });

        break;

      default:
        this.setState(
          move(
            this.state[source.droppableId],
            this.state[destination.droppableId],
            source,
            destination
          )
        );
        break;
    }
  };
  return (
    <Grid container spacing={2}>
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Grid item xs={12} md={8}>
          <Diaporama
            updateMedia={updateMedia}
            eventMedia={eventMedia}
            setEventMedia={setEventMedia}
            id={id}
            isDragging={isDragging}
            getEvents={getEvents}
            closeEvent={closeEvent}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Media
            eventMedia={eventMedia}
            setEventMedia={setEventMedia}
            getEvents={getEvents}
            getMedias={getMedias}
          />
        </Grid>
      </DragDropContext>
    </Grid>
  );
}

export default MediaAndDiaporamaManager;
