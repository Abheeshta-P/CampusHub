import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true }, // Industry Talk, Hackathon, Workshop, etc.
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    description: { type: String, required: true },
    cancelled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
