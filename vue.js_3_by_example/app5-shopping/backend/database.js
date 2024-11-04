var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "./db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    // Cannot open database
    console.log(`Cannot open database..., ${err.message}`);
    throw err
  } else {
    console.log('connected...');
    db.run(`
CREATE TABLE shop_items (
shop_item_id INTEGER NOT NULL PRIMARY KEY,
name TEXT NOT NULL,
description TEXT NOT NULL,
price NUMBER NOT NULL,
image_url TEXT NOT NULL
);

CREATE TABLE orders (
order_id INTEGER NOT NULL PRIMARY KEY,
name TEXT NOT NULL,
address TEXT NOT NULL,
phone TEXT NOT NULL
);

CREATE TABLE order_shop_items (
order_id INTEGER NOT NULL,
shop_item_id INTEGER NOT NULL,
FOREIGN KEY (order_id) REFERENCES orders(order_id),
FOREIGN KEY (shop_item_id) REFERENCES shop_items(shop_item_id)
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
