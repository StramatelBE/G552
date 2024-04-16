const db = require("../Database/db");

class EventMedia {
  constructor() {
    this.createTable();
  }

  createTable() {
    const createTable = `
        CREATE TABLE IF NOT EXISTS event_media
        (
            id INTEGER PRIMARY KEY,
            event_id INTEGER,
            media_id INTEGER NULL,
            media_dur_in_event INTEGER,
            media_pos_in_event INTEGER
        )
    `;
    db.run(createTable);
  }

  create(event) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO event_media (event_id, media_id, media_dur_in_event, media_pos_in_event)
                 VALUES (?, ?, ?, ?)`,
        [event.eventId, event.mediaId, event.duration, 1],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  getAllByEvent(eventId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT media.*, event_media.media_pos_in_event, event_media.media_dur_in_event, event_media.id AS event_media_id
        FROM event_media
        LEFT JOIN media ON event_media.media_id = media.id
        WHERE event_media.event_id = ?
        `,
        [eventId],
        (err, medias) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log("medias", medias);
            resolve(medias);
          }
        }
      );
    });
  }

  getAllByMedia(mediaId) {
    return new Promise((resolve, reject) => {
      db.all(
        "SELECT * FROM event_media WHERE media_id = ?",
        [mediaId],
        (err, events) => {
          if (err) {
            reject(err);
          } else {
            resolve(events);
          }
        }
      );
    });
  }

  deleteAllByMedia(mediaId) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM event_media WHERE id = ?", [mediaId], (err) => {
        if (err) {
          console.log("deleteAllByMedia error", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  deleteAllByEventId(eventId) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM event_media WHERE event_id = ?", [eventId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  delete(eventId, mediaId) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE
                 FROM event_media
                 WHERE event_id = ?
                   AND media_id = ?`,
        [eventId, mediaId],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  updateMediaPositions(event_media_id, newPosition) {
    console.log("updateMediaPositions");
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE event_media
         SET media_pos_in_event = ?
         WHERE id = ?`,
        [newPosition, event_media_id],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
  updateDuration(eventId, mediaId, duration, position) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE event_media
         SET media_dur_in_event = ?
         WHERE event_id = ? AND media_pos_in_event = ?`,
        [duration, eventId, position],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
  addPanel(eventId, media_pos_in_event) {
    const media_dur_in_event = 10;
    const type = "panel";
    const path = "panel";
    console.log(eventId);
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO event_media (event_id, media_id, media_dur_in_event, media_pos_in_event, type, path)
        VALUES (?, null, ?, ?, ?, ?)`,
        [eventId, media_dur_in_event, media_pos_in_event, type, path],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

module.exports = EventMedia;
