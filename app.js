const express = require("express");
const cors = require("cors");
const dbOps = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

dbOps.createECGTable();

app.get("/", (req, res) => {
  let html =
    "<p>Welcome to CardioBit API</p>" +
    "<p>Visit <a href='/ecg'>ecg</a> to get all obtained ecg data.</p>";
  res.send(html);
});
app.get("/ecg", (req, res) => {
  const sql = "SELECT * FROM ecg";
  dbOps.db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });
});
app.get("/ecg/last", (req, res) => {
  const sql = `SELECT * FROM ecg WHERE id = last_insert_rowid()`;
  dbOps.db.get(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });
});
app.get("/ecg/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM ecg WHERE id = ${id}`;
  dbOps.db.get(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });
});
app.get("/ecg/:id/:col", (req, res) => {
  const id = req.params.id;
  const col = req.params.col;
  const sql = `SELECT ${col} FROM ecg WHERE id = ${id}`;
  dbOps.db.get(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    res.send(rows);
  });
});
app.post("/mirror", (req, res) => {
  const sql =
    "INSERT INTO ecg (sample_count, l1, l2, v1, v6) VALUES (?, ? , ? , ? , ?)";
  const body = req.body;
  dbOps.db.run(
    sql,
    [body.Samples, body.L1, body.L2, body.V1, body.V6],
    (err, rows) => {
      if (err) return console.error(err.message);
      console.log(`Data inserted, ID: ${this.lastID}`);
    }
  );
});
app.listen(3000, "0.0.0.0", () => {
  console.log("Server started on port 3000");
});
