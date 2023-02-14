const express = require("express");
const app = express();
const dbOps = require("./db");

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
    console.log(req.headers); 
    console.log(req.body);  
})
app.listen(3000, '0.0.0.0'  ,() => {
  console.log("Server started on port 3000");
});
