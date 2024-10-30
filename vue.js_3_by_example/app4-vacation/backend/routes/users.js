var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();

/* GET users listing. */
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`get ${username} - ${password}`);
  if (username === 'admin' && password === 'password') {
    res.header('Content-Type', 'application/json');
    res.json({ token: jwt.sign({ username }, 'secret') });
  } else {
    res.status(401).send();
  }
});

module.exports = router;
