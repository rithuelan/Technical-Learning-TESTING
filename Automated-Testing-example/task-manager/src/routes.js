const express = require('express');
const { v4: uuidv4 } = require('uuid');
 // <-- fix for Jest CommonJS
const { validateTask } = require('./utils');

const router = express.Router(); // <-- router declared correctly

// In-memory store
const tasks = new Map();

// GET /api/tasks
router.get('/tasks', (req, res) => {
  res.json(Array.from(tasks.values()));
});

// POST /api/tasks
router.post('/tasks', (req, res) => {
  const body = req.body;
  const { valid, errors } = validateTask(body);
  if (!valid) return res.status(400).json({ errors });

  const id = uuidv4();
  const task = {
    id,
    title: body.title.trim(),
    description: (body.description || '').trim(),
    done: !!body.done,
    createdAt: new Date().toISOString()
  };
  tasks.set(id, task);
  res.status(201).json(task);
});

// GET /api/tasks/:id
router.get('/tasks/:id', (req, res) => {
  const task = tasks.get(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });
  res.json(task);
});

// PUT /api/tasks/:id
router.put('/tasks/:id', (req, res) => {
  const task = tasks.get(req.params.id);
  if (!task) return res.status(404).json({ error: 'Not found' });

  const body = req.body;
  const { valid, errors } = validateTask(body, { allowEmptyTitle: true });
  if (!valid) return res.status(400).json({ errors });

  task.title = body.title !== undefined ? body.title.trim() : task.title;
  task.description = body.description !== undefined ? body.description.trim() : task.description;
  if (body.done !== undefined) task.done = !!body.done;
  task.updatedAt = new Date().toISOString();
  tasks.set(task.id, task);
  res.json(task);
});

// DELETE /api/tasks/:id
router.delete('/tasks/:id', (req, res) => {
  const existed = tasks.delete(req.params.id);
  if (!existed) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

module.exports = router;
