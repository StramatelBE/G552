const db = require("../Database/db");
const eventEmitter = require("../Utils/SharedEmitter");  // Instance partagée de EventEmitter


class Event {
  constructor() {
    this.createTable();
  }

  createTable() {
    const createTable = `
            CREATE TABLE IF NOT EXISTS events
            (
                id       INTEGER PRIMARY KEY,
                name     TEXT,

                user_id
                    INTEGER,
                FOREIGN KEY
                    (
                     user_id
                        ) REFERENCES users
                    (
                     id
                        )
            )
        `;
    db.run(createTable);
  }

  create(event) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO events (name, user_id) VALUES (?, ?)`,
        [event.name, event.userId],
        (err) => {
          if (err) {
            reject(err);
          } else {
            eventEmitter.emit('updated', { type: 'Event', data: event });  // Emettez un événement lors de la mise à jour
            resolve(this.getById(this.lastID));
          }
        }
      );
    });
  }

  update(event) {
    console.log(event);
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE events SET name = ? WHERE id = ?`,
        [event.name, event.id],
        (err) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(this.getById(event.id));
          }
        }
      );
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM events`, (err, events) => {
        if (err) {
          reject(err);
        } else {
          resolve(events);
        }
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM events WHERE id = ?`, [id], (err, event) => {
        if (err) {
          reject(err);
        } else {
          resolve(event);
        }
      });
    });
  }

  getByUserId(id) {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM events WHERE user_id = ?`, [id], (err, events) => {
        if (err) {
          reject(err);
        } else {
          resolve(events);
        }
      });
    });
  }

  delete(id) {
    console.log(id);
    return new Promise((resolve, reject) => {
      this.deleteEventMediaByEventId(id)
        .then(() => {
          this.setMacroNull(id).then(() => {
            db.run(`DELETE FROM events WHERE id = ?`, [id], (err) => {
              if (err) {
                console.log(err);
                reject(err);
              } else {
                resolve();
              }
            });
          });
        })

        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  deleteEventMediaByEventId(eventId) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM event_media WHERE event_id = ?`, [eventId], (err) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve();
        }
      });
    });
  }
  setMacroNull(eventId) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE macro SET event_id = NULL WHERE event_id = ?`,
        [eventId],
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

module.exports = Event;
