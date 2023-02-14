const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("mydb.sqlite");

const dbOps = {
  db: db ,
  createRecordsTable: () => {
    db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='records';",
      (err, row) => {
        if (err) {
          console.error(err.message);
        } else if (row) {
          console.log("records table exists!");
        } else {
          console.log("records table does not exist.");

          db.run(`CREATE TABLE records (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  record_id INTEGER UNIQUE NOT NULL
                  )`);
        }
      }
    );
  },
  createECGTable: () => {
    db.get(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='ecg';",
      (err, row) => {
        if (err) {
          console.error(err.message);
        } else if (row) {
          console.log("ecg table exists!");
        } else {
          console.log("creating new ecg table.");

          db.run(`CREATE TABLE ecg(
                  id INTEGER PRIMARY KEY UNIQUE,
                  l1 TEXT,
                  l2 TEXT,
                  v1 TEXT,
                  v6 TEXT
                  )`);
        }
      }
    );
  },
};

module.exports = dbOps; 