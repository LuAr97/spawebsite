const express = require("express");
const db = require('./config/db')
const cors = require('cors')

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/api/services/type/:type", (req, res) => {
    db.query(`SELECT * FROM services WHERE type = ${req.params.type}`, (err, result) => {
        if(err) {
            console.log(`Fetch Services failed : ${err}`);
        }
        res.json(result);
    });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});