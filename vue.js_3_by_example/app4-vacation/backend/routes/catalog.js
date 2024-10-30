const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verify-token');
const db = require('../middlewares/database');

router.get('/', (req, res) => {
  db.serialize(() => {
    db.all("SELECT * FROM catalog_items", [], (err, rows = []) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      } else {
        res.json(rows);
      }
    });
  });
});

router.post('/', verifyToken, (req, res) => {
  const { name, description, imageUrl } = req.body;
  console.log(`${name} - ${description} - ${imageUrl}`);
  const params = [name, description, imageUrl];

  db.serialize(() => {
    const stmt = db.prepare("INSERT INTO catalog_items (name, description, image_url) VALUES (?, ?, ?)");
    stmt.run(params, (err, result) => {
      if (err) {
        res.status(400).json({"error": err.message})
        return;
      } else {
        res.json({ status: 'success' });
      }
    });
    stmt.finalize();
  });
});

router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  db.serialize(() => {
    const stmt = db.prepare("DELETE FROM catalog_items WHERE id = (?)");
    stmt.run(id, (err, result) => {
      if (err) {
        res.status(400).json({"error": err.message})
        return;
      } else {
        res.json({ status: 'success' });
      }
    });
    stmt.finalize();
  });
});

module.exports = router;
