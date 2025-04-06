const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const reportRoutes = require('./routes/reportRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reports', reportRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

// Test route
app.get('/api/test', (req, res) => {
  res.send('API is working 🚀');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
