const db = require('../Database/db');

class TimeoutModel {
    constructor() {
        this.createTable();
    }

    createTable() {
        const createTable = `
            CREATE TABLE IF NOT EXISTS timeout
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER,
                team_id INTEGER,
                count INTEGER,
                time INTEGER,
                FOREIGN KEY (game_id) REFERENCES game(id),
                FOREIGN KEY (team_id) REFERENCES team(id)
            )
        `;
        db.run(createTable);
    }

    insert(game_id, team_id, count, time) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO timeout (game_id, team_id, count, time) VALUES (?, ?, ?, ?)`;
            db.run(sql, [game_id, team_id, count, time], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Return the ID of the created timeout
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM timeout WHERE id = ?";
            db.get(sql, [id], (err, timeout) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(timeout);
                }
            });
        });
    }

    update(id, game_id, team_id, count, time) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE timeout SET game_id = ?, team_id = ?, count = ?, time = ? WHERE id = ?`;
            db.run(sql, [game_id, team_id, count, time, id], (err) => {
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
            const sql = "DELETE FROM timeout WHERE id = ?";
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