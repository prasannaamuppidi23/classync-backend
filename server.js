import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Import Routes
import seedRoutes from './routes/seed.js';
import authRoutes from './routes/auth.js';
import classesRoutes from './routes/classes.js';

// Middleware
app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Classync Backend is up and running!' });
});

// Test route
app.get('/api/status', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Backend is running and connected!'
  });
});

// Route handlers
app.use('/api/seed', seedRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/classes', classesRoutes);

// Database connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});