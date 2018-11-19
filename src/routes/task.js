const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json('Hola Mundo');
});

module.exports = router;
