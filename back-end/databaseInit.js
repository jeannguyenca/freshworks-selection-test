const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./duck.db');

db.serialize(() => {
  db.run("DROP TABLE IF EXISTS feeding");
  db.run(`CREATE TABLE IF NOT EXISTS feeding(
    [id]        INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [time]      TEXT,
    [location]  TEXT,
    [quantity]  INTEGER,
    [quality]   INTEGER)`);
  db.run(`INSERT INTO feeding (time, location, quantity, quality) VALUES 
    (datetime("2021-10-07 03:42:11"), "Stanley Park, Vancouver, BC, Canada", 100, 10),
    (datetime("2021-10-07 01:42:11"), "Queen Elizabeth Park, Cambie Street, Vancouver, BC, Canada", 92, 5)`);
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
