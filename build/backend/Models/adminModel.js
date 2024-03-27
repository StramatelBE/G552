const db = require("../Database/db");

class Admin {
  constructor() {
    this.createTable();
  }

  createTable() {
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serialnumber TEXT
      )
    `;

    db.run(createTableSql, (err) => {
      if (err) {
        console.error("Error creating admin table:", err.message);
      } else {
        console.log("Admin table created.");
        this.checkAndInsertInitialAdminRow();
      }
    });
  }

  checkAndInsertInitialAdminRow() {
    const checkAdminRowSql = `SELECT COUNT(id) AS count FROM admin`;
    db.get(checkAdminRowSql, (err, row) => {
      if (err) {
        console.error("Error checking admin table:", err.message);
      } else if (row.count === 0) {
        this.insertInitialAdminRow();
      }
    });
  }

  insertInitialAdminRow() {
    const insertSql = `
      INSERT INTO admin (serialnumber)
      VALUES (?)
    `;
    const serialNumber = "initia";

    db.run(insertSql, [serialNumber], (err) => {
      if (err) {
        console.error("Error inserting initial row into admin table:", err.message);
      } else {
        console.log("Initial row inserted into admin table.");
      }
    });
  }

  getAdmin() {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM admin`, (err, admin) => {
        if (err) {
          reject(err);
        } else {
          resolve(admin);
        }
      });
    });
  }

  updateAdmin(serialNumber) {
    return new Promise((resolve, reject) => {
      db.run(`UPDATE admin SET serialnumber = ?`, [serialNumber], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = Admin;