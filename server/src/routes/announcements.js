import { Router } from 'express';
import Announcement from '../models/Announcement.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/announcements
router.get('/', requireAuth, async (req, res) => {
  const announcements = await Announcement.find().sort({ date: -1 });
  res.json({ announcements });
});

// GET /api/announcements/today
router.get('/today', async (req, res) => {
  const highlight =
    (await Announcement.findOne({ isTodayHighlight: true }).sort({ date: -1 })) ||
    (await Announcement.findOne().sort({ date: -1 }));

  if (!highlight) {
    return res.status(404).json({ error: 'No announcement available today.' });
  }

  res.json({ announcement: highlight });
});

export default router;
