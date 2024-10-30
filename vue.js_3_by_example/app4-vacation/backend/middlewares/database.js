var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.log(`Cannot open database..., ${err.message}`);
    throw err
  } else {
    console.log('connected...');
    db.run(`
CREATE TABLE catalog_items (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE bookings (
  id INTEGER NOT NULL PRIMARY KEY,
  catalog_item_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  FOREIGN KEY (catalog_item_id) REFERENCES catalog_items(id)
);
    `, (err) => {
      if (err) {
        // table arealy exist
        console.log('table exist');
      } else {
        // exist
        console.log('table no err reported');
      }
  });
  }
});

module.exports = db;
