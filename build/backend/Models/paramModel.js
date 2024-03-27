const db = require("../Database/db");

class Param {
  constructor() {
    this.createTable();
  }

  createTable() {
    const createTable = `
            CREATE TABLE IF NOT EXISTS param
            (
                user_id
                    INTEGER,
                veille_id
                    INTEGER,
                event_auto
                    INTEGER,
                PRIMARY
                    KEY
                    (
                     user_id,
                     veille_id
                        ),
                FOREIGN KEY
                    (
                     user_id
                        ) REFERENCES users
                    (
                     id
                        ),
                FOREIGN KEY
                    (
                     veille_id
                        ) REFERENCES veilles
                    (
                     id
                        )
            )
        `;
    db.run(createTable);
  }

  create(param) {
    // Set event_auto to true by default if not provided
    const eventAuto = param.eventAuto !== undefined ? param.eventAuto : true;

    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO param (user_id, veille_id, event_auto)
                 VALUES (?, ?, ?)`,
        [param.userId, param.veilleId, eventAuto],
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


  getAllByUser(userId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM param WHERE user_id = ?`,
        [userId],
        (err, params) => {
          if (err) {
            reject(err);
          } else {
            resolve(params);
          }
        }
      );
    });
  }

  getAllByVeille(veilleId) {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM param WHERE veille_id = ?`,
        [veilleId],
        (err, params) => {
          if (err) {
            reject(err);
          } else {
            resolve(params);
          }
        }
      );
    });
  }

  deleteByUserAndVeille(userId, veilleId) {
    return new Promise((resolve, reject) => {
      db.run(
        `DELETE FROM param WHERE user_id = ? AND veille_id = ?`,
        [userId, veilleId],
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

  updateEventAuto(userId, veilleId, eventAuto) {
    console.log('updateEventAuto', userId, veilleId, eventAuto);
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE param
         SET event_auto = ?
         WHERE user_id = ? AND veille_id = ?`,
        [eventAuto, userId, veilleId],
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

module.exports = Param;
