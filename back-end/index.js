// import sqlite3 module
const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const port = process.env.PORT || 5000
const dbPath = './duck.db'

app.get('/', (req, res) => {
  let db = new sqlite3.Database(dbPath);

  let sql = `SELECT * FROM feeding`

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    res.send(rows)
  });

  db.close()

})

app.post('/', (req, res) => {
  let db = new sqlite3.Database(dbPath)

  const { datetime, location, numOfDuck, foodWeight } = req.body

  db.run(`INSERT INTO feeding (time, location, quantity, quality) VALUES(datetime(?), ?, ?, ?)`, [datetime, location, numOfDuck, foodWeight], function (err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);

    res.status(200).send({ status: "success" })
  });


})



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})