const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', async (req, res) => {
  const allTasks = await Task.find({});
  res.json(allTasks);
});

router.get('/:id', async (req, res) => {
  const task = await Task.findById({ _id: req.params.id });
  res.json(task);
});

router.post('/', async (req, res) => {
  const { title, description, completed, ...others } = req.body;
  const task = new Task({
    title,
    description,
    //completed
  });
  const saved = await task.save();

  res.json({ message: 'Task saved', dt: saved });
});

router.put('/:id', async (req, res) => {
  const { title, description, completed, ...others } = req.body;
  await Task.findByIdAndUpdate({ _id: req.params.id }, { title, description, completed });

  res.json({ message: 'Task updated', dt: req.body });
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete({ _id: req.params.id });

  res.json({ message: 'Task deleted' })
});

module.exports = router;
