const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('x-token');
  try {
    jwt.verify(token, 'secret');
    console.log('token ok');
    next();
  } catch(err) {
    console.log('token failure');
    res.status(401).send();
  }
}
