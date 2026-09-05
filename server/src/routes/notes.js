import { Router } from 'express';
import Note from '../models/Note.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/notes
router.get('/', requireAuth, async (req, res) => {
  const notes = await Note.find({ student: req.user._id }).sort({ createdAt: -1 });
  res.json({ notes });
});

// POST /api/notes
router.post('/', requireAuth, async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: 'Note content is required.' });
  }

  const note = await Note.create({ student: req.user._id, content: content.trim() });
  res.status(201).json({ note });
});

// DELETE /api/notes/:id
router.delete('/:id', requireAuth, async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, student: req.user._id });
  if (!note) return res.status(404).json({ error: 'Note not found.' });
  await note.deleteOne();
  res.json({ ok: true });
});

export default router;
