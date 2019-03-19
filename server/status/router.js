const express = require('express');
const manager = require('./');

const router = express.Router({ mergeParams: true });

module.exports = router;

router.get('/', (req, res) => {
  res.json(manager.get());
});
