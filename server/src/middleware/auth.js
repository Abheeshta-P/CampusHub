import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Reads "Authorization: Bearer <token>", verifies it, and attaches
// the authenticated user to req.user. Every protected route in
// CampusHub goes through this.
export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: 'Not authenticated.' });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ error: 'Not authenticated.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Session expired. Please sign in again.' });
  }
}
