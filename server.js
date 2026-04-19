import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/classync';

// Routes
import seedRoutes from './routes/seed.js';
import authRoutes from './routes/auth.js';
import classesRoutes from './routes/classes.js';

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/seed', seedRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/classes', classesRoutes);

// Database connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Basic route
app.get('/api/status', (req, res) => {
  res.json({ status: 'success', message: 'Backend is running and connected to frontend!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
