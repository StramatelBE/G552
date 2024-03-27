const db = require('../Database/db');


class Button {
    constructor() {
        this.createTable();

    }
    createTable() {
        const createTable = `
            CREATE TABLE IF NOT EXISTS button
            (
                id INTEGER PRIMARY KEY,
                name TEXT
            )
        `;
        db.run(createTable, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                // Table created, now check if it's empty and initialize if necessary
                this.initializeButtonsIfEmpty();
            }
        });
    }

    initializeButtonsIfEmpty() {
        const checkTableEmpty = `SELECT COUNT(id) AS count FROM button`;
        db.get(checkTableEmpty, (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (row.count === 0) {
                // Table is empty, so we can initialize the buttons
                this.initializeButtons();
            }
        });
    }

    initializeButtons() {
        const insertSql = `INSERT INTO button (name) VALUES (?)`;
        const buttons = Array.from({ length: 15 }, (_, i) => `Button ${i + 1}`);
        
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');
            buttons.forEach(buttonName => {
                db.run(insertSql, [buttonName]);
            });
            db.run('COMMIT', (err) => {
                if (err) {
                    console.error('Could not initialize buttons:', err.message);
                } else {
                    console.log('Buttons initialized successfully');
                }
            });
        });
    }

    create(button) {
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO button (name)
                 VALUES (?)`,
                [button.value],
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

    update(button) {
        return new Promise((resolve, reject) => {
            db.run(
                `UPDATE button
                 SET name = ?
                 WHERE id = ?`,
                [button.name, button.id],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.getById(button.id));
                    }
                }
            );
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT *
                    FROM button`, (err, button) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(button);
                }
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT *
                    FROM button
                    WHERE id = ?`, [id], (err, button) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(button);
                }
            });
        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE
                    FROM button
                    WHERE id = ?`, [id], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

}

module.exports = Button;