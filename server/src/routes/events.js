import { Router } from 'express';
import Event from '../models/Event.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/events
router.get('/', requireAuth, async (req, res) => {
  const events = await Event.find().sort({ date: 1 });
  res.json({ events });
});

// GET /api/events/:id
router.get('/:id', requireAuth, async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found.' });
  res.json({ event });
});

export default router;
