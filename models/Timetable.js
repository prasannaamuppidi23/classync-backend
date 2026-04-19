import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  classId: { type: String, required: true, unique: true },
  schedule: {
    type: Map,
    of: [String], // Map of day -> array of subjects
    default: {
      Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
    }
  }
});

export default mongoose.model('Timetable', timetableSchema);
