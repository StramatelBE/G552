const EventMedia = require("../Models/eventmediaModel");
const Media = require("../Models/mediaModel");
const ffmpeg = require("fluent-ffmpeg");

class EventMediaController {
  constructor() {
    this.eventmedia = new EventMedia();
    this.media = new Media();
  }

  create = (req, res) => {
    const { mediaId, eventId, duration, userId, media_pos_in_event } = req.body;

    // Vérifier si la mediaId correspond à une vidéo
    this.media
      .getById(mediaId)
      .then((media) => {
        if (media && media.type === "video") {
          // Obtenir la durée de la vidéo en utilisant fluent-ffmpeg
          ffmpeg.ffprobe(
            process.env.MEDIA_DISPLAY_PATH + media.path,
            (err, metadata) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: err });
              } else {
                const videoDuration = metadata.format.duration; // Durée de la vidéo en secondes

                // Ajouter la durée de la vidéo à l'événement
                this.eventmedia
                  .create({
                    mediaId,
                    eventId,
                    duration: videoDuration,
                    userId,
                    media_pos_in_event,
                  })
                  .then((eventmedia) => {
                    res.status(201).json(eventmedia);
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: err });
                  });
              }
            }
          );
        } else {
          // Créer l'événement sans la durée de la vidéo
          this.eventmedia
            .create({ mediaId, eventId, userId, media_pos_in_event, duration })
            .then((eventmedia) => {
              res.status(201).json(eventmedia);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ message: err });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err });
      });
  };

  getAllByEvent = (req, res) => {
    this.eventmedia
      .getAllByEvent(req.params.eventId)
      .then((eventmedias) => {
        res.status(200).json(eventmedias);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  getAllByMedia = (req, res) => {
    this.eventmedia
      .getAllByMedia(req.params.media_id)
      .then((eventmedias) => {
        res.status(200).json(eventmedias);
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  };

  delete = (req, res) => {
    const eventId = req.params.id;
    const mediaId = req.body.idBdd;
    this.eventmedia
      .delete(eventId, mediaId)
      .then(() => {
        res.status(204).json();
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  };
  deleteAllByMedia = (req, res) => {
    console.log("deleteAllByMedia");
    console.log(req.params.id);
    const mediaId = req.params.id;
    this.eventmedia
      .deleteAllByMedia(mediaId)
      .then(() => {
        res.status(204).json();
      })
      .catch((err) => {
        res.status(500).json({
          message: err,
        });
      });
  };
  updateMediaPositions = (req, res) => {
    const datas = req.body;
    const promises = datas.map((dataPosition) => {
      const event_media_id = dataPosition.event_media_id;
      const newPosition = dataPosition.media_pos_in_event;
      return this.eventmedia.updateMediaPositions(event_media_id, newPosition);
    });
    Promise.all(promises)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  updateMediaDuration = (req, res) => {
    const { eventId, mediaId, duration } = req.body;

    this.eventmedia
      .updateDuration(eventId, mediaId, duration)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };
}

module.exports = EventMediaController;
