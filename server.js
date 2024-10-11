const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');
const postRoutes = require('./routes/post');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Use JSON parsing with limit
app.use(express.json({ limit: '10mb' }));

// Use CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Change this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allows the server to accept cookies
};
app.use(cors(corsOptions));

// Use Cookie Parser
app.use(cookieParser());

// Connect to the database
connectDB();

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api', uploadRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Catch-all route to serve the React app for any non-API request
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
