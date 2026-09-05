import mongoose from 'mongoose';

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    department: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['normal', 'high'], default: 'normal' },
    date: { type: Date, required: true },
    isTodayHighlight: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Announcement', announcementSchema);
