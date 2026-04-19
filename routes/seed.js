import express from 'express';
import User from '../models/User.js';
import Timetable from '../models/Timetable.js';
import Task from '../models/Task.js';

const router = express.Router();

const INITIAL_TIMETABLE_A = {
  Monday: ['Math', 'Physics', 'Break', 'Chemistry', 'English', 'CS Lab', 'CS Lab', 'Library'],
  Tuesday: ['Chemistry', 'Math', 'Break', 'Physics', 'Biology', 'Sports', 'History', 'Self Study'],
  Wednesday: ['Physics', 'Chemistry', 'Break', 'Math', 'CS', 'CS', 'English', 'Library'],
  Thursday: ['Math', 'Biology', 'Break', 'Physics', 'Chemistry Lab', 'Chemistry Lab', 'History', 'Self Study'],
  Friday: ['CS', 'Math', 'Break', 'English', 'Physics Lab', 'Physics Lab', 'Sports', 'Library'],
  Saturday: ['Test Prep', 'Test Prep', 'Break', 'Doubt Session', 'Seminar', 'Seminar', 'Free', 'Free'],
};

const INITIAL_TIMETABLE_B = {
  Monday: ['English', 'History', 'Break', 'Math', 'Physics', 'Sports', 'Sports', 'Self Study'],
  Tuesday: ['Math', 'English', 'Break', 'Biology', 'Chemistry', 'CS', 'CS', 'Library'],
  Wednesday: ['History', 'Math', 'Break', 'English', 'Physics Lab', 'Physics Lab', 'Chemistry', 'Free'],
  Thursday: ['Biology', 'Physics', 'Break', 'Math', 'English', 'Seminar', 'Seminar', 'Library'],
  Friday: ['Chemistry', 'Biology', 'Break', 'History', 'Math', 'CS Lab', 'CS Lab', 'Sports'],
  Saturday: ['Doubt Session', 'Free', 'Break', 'Test Prep', 'Test Prep', 'Self Study', 'Self Study', 'Free'],
};

router.post('/', async (req, res) => {
  try {
    await User.deleteMany({});
    await Timetable.deleteMany({});
    await Task.deleteMany({});

    // Seed Users
    const users = await User.insertMany([
      { username: 'studentA', password: 'password', role: 'student', name: 'Alex (Class A)', classId: 'CLASS_A' },
      { username: 'coordA', password: 'password', role: 'coordinator', name: 'Mr. Smith (Class A Coord)', classId: 'CLASS_A' },
      { username: 'studentB', password: 'password', role: 'student', name: 'Priya (Class B)', classId: 'CLASS_B' },
      { username: 'coordB', password: 'password', role: 'coordinator', name: 'Ms. Johnson (Class B Coord)', classId: 'CLASS_B' }
    ]);

    // Seed Timetables
    await Timetable.insertMany([
      { classId: 'CLASS_A', schedule: INITIAL_TIMETABLE_A },
      { classId: 'CLASS_B', schedule: INITIAL_TIMETABLE_B }
    ]);

    // Seed Tasks
    await Task.insertMany([
      { title: 'Class A Physics Report', description: 'Upload pendulum experiment.', type: 'Assignment', dueDate: '2026-05-10', classId: 'CLASS_A' },
      { title: 'Class B History Essay', description: 'Write about the French Revolution.', type: 'Assignment', dueDate: '2026-05-12', classId: 'CLASS_B' },
      { title: 'Common Math Test', description: 'Algebra test for all.', type: 'Test', dueDate: '2026-05-15', classId: 'CLASS_A' },
      { title: 'Common Math Test', description: 'Algebra test for all.', type: 'Test', dueDate: '2026-05-15', classId: 'CLASS_B' }
    ]);

    res.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

export default router;
