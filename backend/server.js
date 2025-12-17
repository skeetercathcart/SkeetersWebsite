require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;

// Connect to DB
connectDB();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Request logger
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});

app.use('/', express.static(path.join(__dirname, '..', 'frontend', 'build')));

// API Routes
app.use('/api', require('./routes/api/osrsData'));
app.use('/api', require('./routes/api/homeDepot')); 

app.use('/', require('./routes/root'));

app.get('*', (req, res) => {
  console.log(`Serving React for route: ${req.originalUrl}`);
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', err => {
  console.log(err);
});
