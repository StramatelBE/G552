const db = require('../Database/db');
const fs = require('fs')

class Macro {
    constructor() {
        this.createTable();
    }
    createTable() {
        const createTable = `
            CREATE TABLE IF NOT EXISTS macro
            (
                button_id
                    INTEGER,
                event_id
                    INTEGER,
                user_id
                    INTEGER,
                FOREIGN KEY
                    (
                     user_id
                        ) REFERENCES users
                    (
                     id
                        ),
                FOREIGN KEY
                    (
                     event_id
                        ) REFERENCES events
                    (
                     id
                        ),
                FOREIGN KEY
                    (
                     button_id
                        ) REFERENCES button
                    (
                     id
                        )
            )
        `;
        db.run(createTable);
    }
    create(button_id, eventId, userId) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO macro (button_id, event_id, user_id)
                 VALUES (?, ?, ?)`,
                [button_id, eventId, userId],
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
    getByUserId(userId) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM macro WHERE user_id = ?", [userId], (err, macros) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(macros);
                }
            });
        });
    }

    getByEventId(eventId) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM macro WHERE event_id = ?", [eventId], (err, macros) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(macros);
                }
            });
        });
    }

    getByButtonId(buttonId) {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM macro WHERE button_id = ?", [buttonId], (err, macros) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(macros);
                }
            });
        });
    }



    update(macro) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE macro SET event_id = ? WHERE button_id = ? AND user_id = ?`,
                [macro.event_id, macro.button_id, macro.user_id],
                (err) => {
                    if (err) {
                        reject(err);
                        console.log(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    }
    


    delete(button_id, eventId, userId) {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM macro WHERE button_id = ?, event_id = ?, user_id = ?`,
                [button_id, eventId, userId],
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

module.exports = Macro;