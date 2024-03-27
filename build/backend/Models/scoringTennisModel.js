const db = require("../Database/db");

class TennisScore {
  constructor() {
    this.createTable();
  }

  createTable() {
    const createTable = `
    CREATE TABLE IF NOT EXISTS tennis_score
    (
        id INTEGER PRIMARY KEY,
        player1_name TEXT,
        player2_name TEXT,
        score_player1 INTEGER,
        score_player2 INTEGER,
        sets_won_player1 INTEGER,
        sets_won_player2 INTEGER,
        server_name TEXT,
        timer INTEGER,
        set_type TEXT,
        deciding_point INTEGER,
        tie_break INTEGER,
        tie_break_in_final_set INTEGER,
        number_of_sets INTEGER,
        games_per_set INTEGER
    )
  `;
    db.run(createTable, [], (err) => {
      if (err) {
        console.log(err);
      } else {
        this.initializeFirstScore({
          player1: "Visiteur",
          player2: "Locaux",
          scorePlayer1: 0,
          scorePlayer2: 0,
          setsWonPlayer1: 0,
          setsWonPlayer2: 0,
          server: "Visiteur",
          timer: 0,
          setType: "normal",
          decidingPoint: 0,
          tieBreak: 0,
          tieBreakInFinalSet: 0,
          numberOfSets: 0,
          gamesPerSet: 0,
        });
      }
    });
  }

  initializeFirstScore(score) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM tennis_score", [], (err, rows) => {
        if (err) {
          reject(err);
        } else if (!rows || rows.length === 0) {
          this.create(score).then(resolve).catch(reject);
        } else {
          resolve();
        }
      });
    });
  }

  create(score) {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO scoring (user_id, timer, score_team1, score_team2, faute_team1, faute_team2, nom_team1, nom_team2, option1, option2, option3, option4, option5, option6, option7, option8) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          score.player1,
          score.player2,
          score.scorePlayer1,
          score.scorePlayer2,
          score.setsWonPlayer1,
          score.setsWonPlayer2,
          score.server,
          score.timer,
          score.setType,
          score.decidingPoint,
          score.tieBreak,
          score.tieBreakInFinalSet,
          score.numberOfSets,
          score.gamesPerSet,
        ],
        (err) => {
          if (err) {
            console.error("Erreur lors de la création de la table scoring:", err);
          } else {
            console.log("Table scoring créée ou déjà existante.");
          }
        }
      );
    });
  }

  initializeFirstScore(score) {
    return new Promise((resolve, reject) => {
      this.getAll()
        .then((scores) => {
          if (scores.length === 0) {
            this.create(score).then(resolve).catch(reject);
          } else {
            resolve();
          }
        })
        .catch(reject);
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM tennis_score", [], (err, scores) => {
        if (err) {
          reject(err);
        } else {
          resolve(scores);
        }
      });
    });
  }

  getScoreById(id) {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM tennis_score WHERE id = ?", [id], (err, score) => {
        if (err) {
          reject(err);
        } else {
          resolve(score);
        }
      });
    });
  }
  updateConfig(score) {
    console.log(score.numOfSets);
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE tennis_score
          SET player1_name = ?, player2_name = ?, set_type = ?, deciding_point = ?, tie_break = ?, tie_break_in_final_set = ?, number_of_sets = ?, games_per_set = ?
          WHERE id = 1`,
        [
          score.player1,
          score.player2,
          score.lastSetType,
          score.decidingPoint,
          score.tieBreak,
          score.tieBreakInFinalSet,
          score.numOfSets,
          score.gamesPerSet,
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

  updateScoreById(id, score) {
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE tennis_score
         SET score_player1 = ?, score_player2 = ?, sets_won_player1 = ?, sets_won_player2 = ?, server_name = ?, timer = ?, set_type = ?, deciding_point = ?, tie_break = ?, tie_break_in_final_set = ?, number_of_sets = ?, games_per_set = ?
         WHERE id = ?`,
        [
          score.scorePlayer1,
          score.scorePlayer2,
          score.setsWonPlayer1,
          score.setsWonPlayer2,
          score.server,
          score.timer,
          score.setType,
          score.decidingPoint,
          score.tieBreak,
          score.tieBreakInFinalSet,
          score.numberOfSets,
          score.gamesPerSet,
          id,
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

  deleteScoreById(id) {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM tennis_score WHERE id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = TennisScore;
