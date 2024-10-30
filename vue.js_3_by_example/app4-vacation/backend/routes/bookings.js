const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const verifyToken = require('../middlewares/verify-token');
const db = require('../middlewares/database.js');

router.get('/', (req, res, next) => {
  db.serialize(() => {
    db.all(`
SELECT bookings.*,
catalog_items.name AS catalog_item_name,
catalog_items.description AS catalog_item_description
FROM bookings
INNER JOIN catalog_items ON catalog_items.id = bookings.catalog_item_id
`,
           [], (err, rows = []) => {
             res.json(rows);
           });
  })
});

router.post('/', (req, res, next) => {
  const { catalogItemId, name, address, startDate, endDate } = req.body
  db.serialize(() => {
    const stmt = db.prepare(`
INSERT INTO bookings (
catalog_item_id,
name,
address,
start_date,
end_date,
) VALUES (?, ?, ?, ?)
`);
    stmt.run(catalogItemId, name, address, startDate, endDate);
    stmt.finalize();
    res.json({ catalogItemId, name, startDate, endDate });
  })
});

router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  db.serialize(() => {
    const stmt = db.prepare("DELETE FROM bookings WHERE id = (?)");
    stmt.run(id);
    stmt.finalize();
    res.json({ status: 'success' });
  });
});

module.exports = router;
