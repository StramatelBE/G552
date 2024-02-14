const db = require('../Database/db');

class FoulsModel {
    constructor() {
        this.createTable();
    }

    createTable() {
        const createTable = `
            CREATE TABLE IF NOT EXISTS fouls
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                game_id INTEGER,
                team_id INTEGER,
                
                FOREIGN KEY (game_id) REFERENCES game(id),
                FOREIGN KEY (team_id) REFERENCES team(id)
            )
        `;
        db.run(createTable);
    }
}