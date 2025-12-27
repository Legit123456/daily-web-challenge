import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projectRoutes.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';

// 1. Initialize Configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middleware
app.use(cors());
app.use(express.json()); // Native JSON parsing
app.use(express.urlencoded({ extended: true })); // Native Form parsing

// 3. Database Connection (Mongoose 9 Pattern)
const connectDB = async () => {
  try {
    // Note: Mongoose 9 deprecated 'useNewUrlParser' and 'useUnifiedTopology' options. 
    // They are now default and should not be passed.
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// 4. Routes
app.get('/', (req, res) => {
  // Express 5 Breaking Change: You MUST chain .status() before .send()
  res.status(200).send('API is running... Status: Online 🚀');
});

app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes); 
app.use('/api/subscribe', subscriberRoutes);

// Express 5 Feature: Native 404 Handler (No extra packages needed)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// 5. Start Server
// We connect to DB first, then start listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅✅ Server running on port ${PORT}`);
  });
});
