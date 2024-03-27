const express = require("express");
const db = require('./config/db')
const cors = require('cors')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

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

app.get("/unavailability/:date", (req, res) => {
    db.query(`SELECT * FROM availability WHERE date = '${req.params.date}'`, (err, result) => {
        if(err) {
            console.log(`Fetch unavailability failed : ${err}`);
        }
        res.json(result);
    });
});

app.get("/bookings/:date", (req, res) => {
    db.query(`SELECT b.*,c.name as client ,s.name as service, s.img FROM booking b INNER JOIN clients c ON c.id = b.client_id INNER JOIN services s ON s.id = b.service_id WHERE date = '${req.params.date}'`, (err, result) => {
        if(err) {
            console.log(`Fetch unavailability failed : ${err}`);
        }
        res.json(result);
    });
});

app.get("/accounts/:username", (req, res) => {
    db.query(`SELECT * FROM accounts WHERE username = '${req.params.username}'`, (err, result) => {
        if(err) {
            console.log(`Fetch unavailability failed : ${err}`);
        }
        res.json(result);
    });
});

app.post("/booking", (req, res) => {
    const body = req.body;
    db.query(`INSERT INTO booking(date, time, expired, client_id, comments, service_id, current_session) VALUES ('${body.date}', '${body.time}', ${body.expired}, ${body.clientId}, '${body.comment}', ${body.serviceId}, '${body.session}')`, (err, result) => {
        if(err) {
            console.log(`Post booking failed : ${err}`);
        }
        res.json(result);
    });
});

app.post("/client", (req, res) => {
    const body = req.body;
    db.query(`INSERT INTO clients(name, age, email) VALUES ( '${body.name}', ${body.age}, '${body.email}' );`, (err, result) => {
        if(err) {
            console.log(`Post clien failed : ${err}`);
            res.json(err);
        }
        res.json(result);
        
    });
});

app.post("/availability", (req, res) => {
    const body = req.body;
    db.query(`INSERT INTO availability(date, time) VALUES ('${body.date}', '${body.time}')`, (err, result) => {
        if(err) {
            console.log(`Fetch unavailability failed : ${err}`);
        }
        res.json(result);
    });
});



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});