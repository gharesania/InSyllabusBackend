const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

// Import Routes for 
const universityRoutes = require("./routes/universityRoute");
const programRoutes = require("./routes/programRoute");
const branchRoutes = require("./routes/branchRoute");
const semesterRoutes =  require("./routes/semesterRoute");
const subjectRoutes = require("./routes/subjectRoute");


// Connect database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Server Connection Testing
app.get('/', (req, res) => res.send('Hello World!'));


// Routes
app.use("/api/universities", universityRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/semesters", semesterRoutes);
app.use("/api/subjects", subjectRoutes);


app.listen(port, () => {
  console.log(`Server is running at ${port} ✅`);
});
