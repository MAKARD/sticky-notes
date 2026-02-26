var express = require('express');
var router = express.Router();
const { randomUUID } = require('crypto');

// <id, note data>
const inMemoryNotes = new Map();

router.get('/list', function (req, res) {
  res.json({
    stickyNotes: Array.from(inMemoryNotes.values())
  });
});

router.patch('/', function (req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'id is required in query' });
  }

  const existingNote = inMemoryNotes.get(id);

  if (!existingNote) {
    return res.status(404).json({ message: 'Sticky note not found' });
  }

  const updatedNote = {
    ...existingNote,
    ...req.body,
    id
  };

  inMemoryNotes.set(id, updatedNote);

  res.json({});
});

router.post('/', function (req, res) {
  const { size, text, position, color } = req.body;

  if (!size || !position || !color) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const id = randomUUID();

  const newNote = {
    id,
    size,
    text,
    position,
    color
  };

  inMemoryNotes.set(id, newNote);

  res.status(201).json(newNote);
});

module.exports = router;
