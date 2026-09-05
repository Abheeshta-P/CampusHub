import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    studentId: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    skills: { type: [String], default: [] },
    avatarColor: { type: String, default: '#C08A2E' },
  },
  { timestamps: true }
);

// Never send the password hash back to the client.
userSchema.methods.toPublicJSON = function toPublicJSON() {
  return {
    id: this._id,
    username: this.username,
    name: this.name,
    studentId: this.studentId,
    department: this.department,
    year: this.year,
    email: this.email,
    phone: this.phone,
    skills: this.skills,
    avatarColor: this.avatarColor,
  };
};

export default mongoose.model('User', userSchema);
