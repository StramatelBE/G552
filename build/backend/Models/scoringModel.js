const db = require("../Database/db");

class Scoring {
  constructor() {
    this.createTable();
  }

  createTable() {
    const createTable = `
      CREATE TABLE IF NOT EXISTS scoring
      (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        timer INTEGER DEFAULT 0,
        score_team1 INTEGER DEFAULT 0,
        score_team2 INTEGER DEFAULT 0,
        faute_team1 INTEGER DEFAULT 0,
        faute_team2 INTEGER DEFAULT 0,
        nom_team1 TEXT DEFAULT 'Visiteur',
        nom_team2 TEXT DEFAULT 'Locaux',
        option1 INTEGER,
        option2 INTEGER,
        option3 INTEGER,
        option4 INTEGER,
        option5 INTEGER,
        option6 INTEGER,
        option7 TEXT,
        option8 TEXT
      )
    `;

    db.run(createTable);
  }

  create(score, userId) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO scoring (user_id, timer, score_team1, score_team2, faute_team1, faute_team2, nom_team1, nom_team2, option1, option2, option3, option4, option5, option6, option7, option8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          score.timer,
          score.team1,
          score.team2,
          score.fauteTeam1,
          score.fauteTeam2,
          score.nomTeam1,
          score.nomTeam2,
          score.option1,
          score.option2,
          score.option3,
          score.option4,
          score.option5,
          score.option6,
          score.option7,
          score.option8,
        ],
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

  update(userId, score) {
    return new Promise((resolve, reject) => {
      const fieldsToUpdate = [];
      const values = [];

      // Pour chaque champ de score, vérifiez s'il a une valeur
      for (let field in score) {
        if (score.hasOwnProperty(field) && score[field] !== undefined) {
          fieldsToUpdate.push(`${field} = ?`);
          values.push(score[field]);
        }
      }

      // S'il n'y a rien à mettre à jour, résolvez immédiatement la promesse
      if (fieldsToUpdate.length === 0) {
        return resolve(userId);
      }

      // Ajoutez userId à la liste des valeurs pour la clause WHERE
      values.push(userId);

      const sql = `UPDATE scoring SET ${fieldsToUpdate.join(
        ", "
      )} WHERE user_id = ?`;

      db.run(sql, values, (err) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(userId);
        }
      });
    });
  }

  updateSettings(userId, score) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE scoring SET user_id = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?, option5 = ?, option6 = ?, option7 = ?, option8 = ? WHERE id = ?`,
        [
          userId,
          score.option1,
          score.option2,
          score.option3,
          score.option4,
          score.option5,
          score.option6,
          score.option7,
          score.option8,
          score.id,
        ],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(score.id);
          }
        }
      );
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM scoring`, (err, scores) => {
        if (err) {
          reject(err);
        } else {
          resolve(scores);
        }
      });
    });
  }

  getByUserId(userId) {
    console.log("getByUserId", userId);
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT * FROM scoring WHERE user_id = ?`,
        [userId],
        (err, scores) => {
          if (err) {
            reject(err);
          } else {
            resolve(scores);
          }
        }
      );
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM scoring WHERE id = ?`, [id], (err, score) => {
        if (err) {
          reject(err);
        } else {
          resolve(score);
        }
      });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM scoring WHERE id = ?`, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Scoring;
