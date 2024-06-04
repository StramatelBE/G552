const db = require("../Database/db");

class ActiveSession {
  constructor() {
    this.createTable();
  }

  createTable() {
    const createTable = `
    CREATE TABLE IF NOT EXISTS activeSessions (
            id INTEGER PRIMARY KEY,
            userId INTEGER,
            activeToken TEXT,
            last_activity INTEGER
        )
        `;
    db.run(createTable, (err) => {
      if (err) {
        console.error("Error creating activeSessions table:", err.message);
      } else {
        this.initializeTableIfEmpty();
      }
    });
  }

  initializeTableIfEmpty() {
    const checkTableEmptySql = `SELECT COUNT(id) AS count FROM activeSessions`;
    db.get(checkTableEmptySql, (err, row) => {
      if (err) {
        console.error("Error checking activeSessions table:", err.message);
      } else if (row.count === 0) {
        // La table est vide, insérez une ligne initiale
        this.insertInitialRow();
      }
    });
  }

  insertInitialRow() {
    const insertSql = `
      INSERT INTO activeSessions (userId, activeToken, last_activity)
      VALUES (?, ?, ?)
    `;
    // Remplacez les valeurs ci-dessous par les valeurs initiales souhaitées
    const userId = null;
    const activeToken = null;
    const lastActivity = null;

    db.run(insertSql, [userId, activeToken, lastActivity], (err) => {
      if (err) {
        console.error(
          "Error inserting initial row into activeSessions table:",
          err.message
        );
      } else {
      }
    });
  }

  async create(session) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO activeSessions (userId, activeToken, last_activity) VALUES (?, ?, ?)`,
        [session.userId, session.activeToken, session.last_activity],
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
  logout() {
    console.log("logout");
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE activeSessions SET userId = NULL ,activeToken = NULL, last_activity = NULL WHERE id = 1`,

        (err) => {
          if (err) {
            console.log("err", err);
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
  getAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM activeSessions`, (err, sessions) => {
        if (err) {
          reject(err);
        } else {
          resolve(sessions);
        }
      });
    });
  }

  async getFirst() {
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM activeSessions ORDER BY id ASC LIMIT 1`,
        (err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        }
      );
    });
  }

  getByUserId(userId) {
    console.log("getByUserId", userId);
    return new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM activeSessions WHERE userId = ? ORDER BY last_activity DESC`,
        [userId],
        (err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        }
      );
    });
  }

  updateOne(session) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE activeSessions SET userId = ?, activeToken = ?, last_activity = ? WHERE id = 1`,
        [session.userId, session.active_token, session.last_activity],
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
      db.run(`DELETE FROM activeSessions WHERE id = ?`, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = ActiveSession;
