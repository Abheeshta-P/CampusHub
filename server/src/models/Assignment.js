import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    subject: { type: String, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, enum: ['not_started', 'in_progress', 'submitted'], default: 'not_started' },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Assignment', assignmentSchema);
