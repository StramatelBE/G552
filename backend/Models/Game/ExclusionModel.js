const db = require('../Database/db');

class ExclusionModel {
    constructor() {
        this.createTable();
    }

    createTable() {
        const createTable = `
            CREATE TABLE IF NOT EXISTS exclusion
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER,
                team_id INTEGER,
                timer INTEGER,
                shirtNumber INTEGER,
                FOREIGN KEY (game_id) REFERENCES game(id),
                FOREIGN KEY (team_id) REFERENCES team(id)
            )
        `;
        db.run(createTable);
    }

    insert(game_id, team_id, timer, shirtNumber) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO exclusion (game_id, team_id, timer, shirtNumber) VALUES (?, ?, ?, ?)`;
            db.run(sql, [game_id, team_id, timer, shirtNumber], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Return the ID of the created exclusion
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM exclusion WHERE id = ?";
            db.get(sql, [id], (err, exclusion) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(exclusion);
                }
            });
        });
    }

    update(id, game_id, team_id, timer, shirtNumber) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE exclusion SET game_id = ?, team_id = ?, timer = ?, shirtNumber = ? WHERE id = ?`;
            db.run(sql, [game_id, team_id, timer, shirtNumber, id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(id);
                }
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM exclusion WHERE id = ?";
            db.run(sql, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(null);
                }
            });
        });
    }
}