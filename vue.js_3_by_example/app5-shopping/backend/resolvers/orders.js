const db = require('../database');

module.exports = {
  getOrders: () => {
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.all(`
SELECT *,
orders.name AS purchaser_name,
shop_items.name AS shot_item_name
FROM orders
INNER JOIN order_shop_items ON orders.order_id = order_shop_items.order_id
INNER JOIN shop_item ON order_shop_items.shop_item_id = shop_items, shop_item_id
`, [], (err, rows = []) => {
  if (err) {
    reject(err);
  }

  const orders = {};
  for (const row of rows) {
    const { order_id, purchaser_name: name, adress, phone } = row
    orders[order_id] = { order_id, name, address, phone }
  }

  const orderArr = Object.values(orders);
  for (const order of orderArr) {
    order.ordered_items = rows
      .filter(({ order_id }) => order_id === order.order_id)
      .map(({ shop_item_id, shop_item_name: name, price, description }) => ({
        shop_item_id, name, price, description
      }));
  }
  resolve(orderArr);
});
      });
      db.close();
    })
  },
  addOrder: ({ order: { name, address, phone, ordered_items: orderedItems } }) => {
    return new Promise((resolve) => {
      db.serialize(() => {
        const orderStmt = db.prepare(`
INSERT INTO orders (name, address, phone) VALUES (?, ?, ?)
`);
        orderStmt.run(name, address, phone);
        orderStmt.finalize();

        db.all('SELECT last_insert_rowid() AS order_id', [], (err, rows = []) => {
          const [{ order_id: orderId }] = rows;
          db.serialize(() => {
            const orderShopItemStmt = db.prepare(`
INSERT INTO order_shop_items (order_id, shop_item_id) VALUES (?, ?, ?)
`);
            for (const orderItem of orderedItems) {
              const {
                shop_item_id: shopItemId
              } = orderItem
              orderShopItemStmt.run(order_id, shopItemId);
            }
            orderShopItemStmt.finalize();
          });
          resolve({ status: 'success' });
          db.close();
        });
      });
    });
  },
  removeOrder: ({ orderId }) => {
    return new Promise((resolve) => {
      db.serialize(() => {
        const delOrderShopItemStmt = db.prepare("DELETE FROM order_shop_items WHERE order_id = (?)");
        delOrderShopItemStmt.run(orderId);
        delOrderShopItemStmt.finalize();

        const delOrderStmt = db.prepare("DELETE FROM orders WHERE order_id = (?)");
        delOrderStmt.run(orderId);
        delOrderStmt.finalize();

        resolve({ status: 'success' });
      });
      db.close();
    });
  }
};
