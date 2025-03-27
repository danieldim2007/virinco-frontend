
require('dotenv');
const express = require('express');
const mysql = require('mysql12');
const cors = require('cors');

const app  = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

db.connect(err => {
    if(err){
        console.error('Kunne ikke koble til Databasen', err)
    }
    else{
        console.log("Koblet til MYSQL!!")
    }
});

app.get('/sensors', (req, res) =>{
    const sql = 'SELECT lat, lng, temperature FROM sensors';
    db.query(sql, (err, results) =>{
        if(err){
            return res.status(500).json({error: err.message});
        }
        res.json({sensors: results});
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server kjører på port ${PORT}`);
});