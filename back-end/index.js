// import sqlite3 module
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const app = express()

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 5000
const dbPath = './duck.db'

app.get('/', (req, res) => {
  let db = new sqlite3.Database(dbPath);

  let sql = `SELECT * FROM feeding`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows)
  });

  db.close()

})

app.post('/', (req, res) => {
  let db = new sqlite3.Database(dbPath);
  let sql = `SELECT * FROM feeding`;

  console.log('req', req.body)
  res.send("received")

})



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})