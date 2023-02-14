const express = require("express");
const dbOps = require("./db");

const app = express();
app.use(express.json()); 

dbOps.createECGTable();

app.get("/", (req, res) => {
  let html = "<p>Welcome to CardioBit API</p>"
            + "<p>Visit <a href='/ecg'>ecg</a> to get all obtained ecg data.</p>";
  res.send(html); 
});
app.get("/ecg", (req, res) => {
    const sql = 'SELECT * FROM ecg' ; 
    dbOps.db.all(sql, [] , (err, rows) => {
        if (err) return console.error(err.message); 
        res.send(rows);
    })
})
app.post("/mirror", (req,res) => { 
    const sql = 'INSERT INTO ecg (sample_count, l1, l2, v1, v6) VALUES (?, ? , ? , ? , ?)';  
    const body = req.body ; 
    dbOps.db.run(sql, [body.Samples, body.L1, body.L2, body.V1, body.V6],(err,rows) => {
        if (err) return console.error(err.message); 
        console.log(`Data inserted, ID: ${this.lastID}`);
    });
})
app.listen(3000, '0.0.0.0'  ,() => {
  console.log("Server started on port 3000");
});
