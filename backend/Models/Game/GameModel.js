const db = require('../Database/db');

class GameModel {
    constructor() {
        this.createTable();
    }

    createTable() {
        const createTable = `
            CREATE TABLE IF NOT EXISTS game
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sport TEXT,
                period TEXT,
                set TEXT,
                tieBreak TEXT,
                clock BOOLEAN,
            )
        `;
        db.run(createTable);
    }

    insert(sport, period, set, tieBreak, clock) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO game (sport, period, set, tieBreak, clock, timer, timer24s, guestTeam, homeTeam) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.run(sql, [sport, period, set, tieBreak, clock], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Return the ID of the created game
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM game WHERE id = ?";
            db.get(sql, [id], (err, game) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(game);
                }
            });
        });
    }

    update(id, sport, period, set, tieBreak, clock) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE game SET sport = ?, period = ?, set = ?, tieBreak = ?, clock = ? WHERE id = ?`;
            db.run(sql, [sport, period, set, tieBreak, clock, id], (err) => {
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
            const sql = `DELETE FROM game WHERE id = ?`;
            db.run(sql, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(id);
                }
            });
        });
    }
}

module.exports = GameModel;
