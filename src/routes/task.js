const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  const allTasks = await Task.find({});
  res.json(allTasks);
});

module.exports = router;
