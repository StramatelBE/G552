const db = require('../Database/db');

class TimerModel {
    constructor() {
        this.createTable();
    }

    createTable() {
        const createTable = `
            CREATE TABLE IF NOT EXISTS timer
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER,
                value INTEGER,
                display BOOLEAN,
                status BOOLEAN,
                led BOOLEAN,
                horn BOOLEAN,
                timer24s BOOLEAN,
                FOREIGN KEY (game_id) REFERENCES game(id)
            )
        `;
        db.run(createTable);
    }

    insert(game_id, value, display, status, led, horn, timer24s) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO timer (game_id, value, display, status, led, horn, timer24s) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            db.run(sql, [game_id, value, display, status, led, horn, timer24s], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID); // Return the ID of the created timer
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM timer WHERE id = ?";
            db.get(sql, [id], (err, timer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(timer);
                }
            });
        });
    }

    update(id, game_id, value, display, status, led, horn, timer24s) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE timer SET game_id = ?, value = ?, display = ?, status = ?, led = ?, horn = ?, timer24s = ? WHERE id = ?`;
            db.run(sql, [game_id, value, display, status, led, horn, timer24s, id], (err) => {
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
            const sql = `DELETE FROM timer WHERE id = ?`;
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