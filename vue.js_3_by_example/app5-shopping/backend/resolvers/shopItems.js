const db = require('../database');

module.exports = {
  getShopItems: () => {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all('SELECT * FROM shop_items', [], (err, rows = []) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      })
      db.close();
    })
  },
  addShopItem: ({ shopItem: { name, description, image_url: imageUrl, price } }) => {
    return new Promise((resolve) => {
      db.serialize(() => {
        const stmt = db.prepare(`
INSERT INTO shop_items (name, description, image_url, price)
VALUES (?, ?, ?, ?)
`);
        stmt.run(name, description, image_url, price);
        stmt.finalize();
        resolve({ status: 'success' });
      });
      db.close();
    })
  },
  removeShopItem: ({ shopItemId }) => {
    return new Promise((resolve) => {
      db.serialize(() => {
        const stmt = db.prepare('DELETE FROM shop_items WHERE shop_item_id = (?)');
        stmt.run(shopItemId);
        stmt.finalize();
        resolve({ status: 'success' });
      });
      db.close();
    });
  },
}
