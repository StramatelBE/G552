// Models/veilleModel.js
const db = require("../Database/db");
const sharedEmitter = require("../Utils/SharedEmitter");

class Veille {
  constructor() {
    this.createTable();
  }

  createTable() {
    const createTable = `
            CREATE TABLE IF NOT EXISTS veille
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                enable BOOLEAN NOT NULL DEFAULT 1,
                start_time INTEGER,
                end_time INTEGER,
                restart_at STRING
            )
        `;
    db.run(createTable, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        this.initialize();
      }
    });
  }

  initialize() {
    const checkTableEmpty = `SELECT COUNT(id) AS count FROM veille`;
    db.get(checkTableEmpty, (err, row) => {
      if (err) {
        console.error(err.message);
        return;
      }
      if (row.count === 0) {
        // Table is empty, so we can initialize the buttons
        const veille = {
          enable: 1,
          startTime: 7,
          endTime: 23,
          restartAt: "04:00",
        };
        this.create(veille);
      }
    });
  }

  create(veille) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO veille (enable, start_time, end_time, restart_at)
                 VALUES (?, ?, ?, ?)`,
        [veille.enable, veille.startTime, veille.endTime, veille.restartAt],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        }
      );
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM veille", (err, veilles) => {
        if (err) {
          reject(err);
        } else {
          resolve(veilles);
        }
      });
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM veille WHERE id = ?", [id], (err, veille) => {
        if (err) {
          reject(err);
        } else {
          resolve(veille);
        }
      });
    });
  }

  update(veille) {
    return new Promise((resolve, reject) => {
      console.log("before emit.")

        sharedEmitter.emit('updateSchedule', veille.restart_at);  // Ensure you pass the necessary data for listeners
        console.log("has sended.")
        db.run(
            `UPDATE veille
             SET enable = ?, start_time = ?, end_time = ?, restart_at = ?
             WHERE id = ?`,
            [
                veille.enable,
                veille.start_time,
                veille.end_time,
                veille.restart_at,
                veille.id,  // Assuming 'veille' object has 'id'
            ],
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


  delete(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM veille WHERE id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Veille;
