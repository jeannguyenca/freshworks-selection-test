const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./duck.db');

//with serialize method
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS feeding");
  db.run(`CREATE TABLE IF NOT EXISTS feeding(
    [id]        INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    [time]      TEXT,
    [location]  TEXT,
    [quantity]  INTEGER,
    [quality]   INTEGER)`);
  db.run(`INSERT INTO feeding (time, location, quantity, quality) VALUES 
    ("1", "Test", 1, 1)`);
});

db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
