const express = require('express');
const router = express.Router();
const db = require('../middlewares/database');
const verifyToken = require('../middlewares/verify-token');

router.get('/', (req, res) => {
  db.all("SELECT * FROM catalog_items", [], (err, rows = []) => {
    if (err) {
      res.status(400).json({"error":err.message});
      return;
    } else {
      res.json(rows);
    }
  });
});

router.post('/', verifyToken, (req, res) => {
  const { name, description, imageUrl } = req.body;
  console.log(`${name} - ${description} - ${imageUrl}`);
  const sql = 'INSERT INTO catalog_items (name, description, image_url) VALUES (?, ?, ?)';
  const params = [name, description, imageUrl];

  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return;
    } else {
      res.json({ status: 'success' });
    }
  });
});

router.delete('/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM catalog_items WHERE id = (?)";
  const params = [id];

  db.run(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({"error": err.message})
      return;
    } else {
      res.json({ status: 'success' });
    }
  });
});

module.exports = router;
