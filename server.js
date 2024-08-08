const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Floriano0987$',
    database: 'tourist_guide'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
});


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/destinations', (req, res) => {
    db.query('SELECT * FROM Destinations', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/destinations/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Destinations WHERE id = ?', [id], (err, destination) => {
        if (err) throw err;
        db.query('SELECT * FROM Attractions WHERE destination_id = ?', [id], (err, attractions) => {
            if (err) throw err;
            res.json({ destination: destination[0], attractions });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
