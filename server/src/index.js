import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import assignmentRoutes from './routes/assignments.js';
import noteRoutes from './routes/notes.js';
import profileRoutes from './routes/profile.js';

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/profile', profileRoutes);


// Generic error handler — keeps internal details out of responses.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

const PORT = process.env.PORT || 5050;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[campus-hub] API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[campus-hub] Failed to start:', err.message);
    process.exit(1);
  });
