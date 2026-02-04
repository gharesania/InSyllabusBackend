const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Import Routes
const universityRoutes = require("./routes/universityRoute");

// Connect database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));


// Routes
app.use("/api/universities", universityRoutes);


app.listen(port, () => {
  console.log(`Server is running at ${port} ✅`);
});
