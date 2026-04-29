import express from 'express';
import Timetable from '../models/Timetable.js';
import Task from '../models/Task.js';

const router = express.Router();

// ✅ BASE ROUTE (IMPORTANT FIX)
router.get("/", (req, res) => {
  res.json({ message: "Classes API working ✅" });
});

// 📅 GET Timetable for a class
router.get('/:classId/timetable', async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ classId: req.params.classId });

    if (!timetable) {
      return res.status(404).json({ error: 'Timetable not found' });
    }

    res.json(timetable.schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ UPDATE Timetable for a class
router.put('/:classId/timetable', async (req, res) => {
  try {
    const { schedule } = req.body;

    const timetable = await Timetable.findOneAndUpdate(
      { classId: req.params.classId },
      { schedule },
      { new: true, upsert: true }
    );

    res.json(timetable.schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 GET Tasks for a class
router.get('/:classId/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ classId: req.params.classId })
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ ADD Task
router.post('/:classId/tasks', async (req, res) => {
  try {
    const taskData = { ...req.body, classId: req.params.classId };

    const newTask = new Task(taskData);
    await newTask.save();

    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE Task
router.delete('/tasks/:taskId', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.taskId);

    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;