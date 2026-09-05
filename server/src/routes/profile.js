import { Router } from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

const SET_FIELDS = ['phone', 'department', 'year'];

// PUT /api/profile
router.put('/', requireAuth, async (req, res) => {

  const updateOps = { $set: {} };
  for (const field of SET_FIELDS) {
    if (field in req.body) updateOps.$set[field] = req.body[field];
  }
  if ('skills' in req.body) {
    updateOps.$push = { skills: { $each: req.body.skills } };
  }
  if (Object.keys(updateOps.$set).length === 0) delete updateOps.$set;

  const updated = await User.findByIdAndUpdate(req.user._id, updateOps, {
    new: true,
    runValidators: true,
  });

  res.json({ user: updated.toPublicJSON() });
});

export default router;
