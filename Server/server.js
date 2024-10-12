const express = require('express');
const cors = require('cors');
require('dotenv').config();
const geocodeRoutes = require('./Routes/Geolocationroute');
const errorHandler = require('./Midlewares/Errorhandler');
const ConnectDB = require('./Config')

const app = express();
const port = 5000;

ConnectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());



// Routes
app.use('/api', geocodeRoutes);
app.use('/api/auth', require('./Routes/auth'));

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
