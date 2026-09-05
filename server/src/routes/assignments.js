import { Router } from 'express';
import Assignment from '../models/Assignment.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/assignments
router.get('/', requireAuth, async (req, res) => {
  const assignments = await Assignment.find({ student: req.user._id }).sort({ deadline: 1 });
  res.json({ assignments });
});

// GET /api/assignments/:id
router.get('/:id', requireAuth, async (req, res) => {

  const assignment = await Assignment.findById(req.params.id);
  if (!assignment) {
    return res.status(404).json({ error: 'Assignment not found.' });
  }

  res.json({ assignment });
});

export default router;
