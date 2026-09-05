import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // cwd .env
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // server/.env
dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // root .env
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';

import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import assignmentRoutes from './routes/assignments.js';
import noteRoutes from './routes/notes.js';
import profileRoutes from './routes/profile.js';

const app = express();

const clientOrigin = process.env.CLIENT_ORIGIN;
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl) or matching origins
      if (!origin || !clientOrigin || origin === clientOrigin) return callback(null, true);
      if (origin.startsWith('http://localhost:') || origin.endsWith('.vercel.app')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

// Ensure database connection is active before processing API requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('[campus-hub] Database connection error:', err.message);
    res.status(500).json({ error: 'Database connection failed. Please check MONGODB_URI.' });
  }
});

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

if (!process.env.VERCEL) {
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
}

export default app;
