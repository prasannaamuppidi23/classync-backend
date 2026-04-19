import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Plain text for now as agreed
  role: { type: String, enum: ['student', 'coordinator'], required: true },
  name: { type: String, required: true },
  classId: { type: String, required: true } // Identifier for the class/section they belong to or manage
});

export default mongoose.model('User', userSchema);
