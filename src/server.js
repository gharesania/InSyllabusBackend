const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// Import Routes for
const universityRoutes = require("./routes/universityRoute");
const programRoutes = require("./routes/programRoute");
const branchRoutes = require("./routes/branchRoute");
const semesterRoutes = require("./routes/semesterRoute");
const subjectRoutes = require("./routes/subjectRoute");

// Connect database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Server Connection Testing
app.get("/", (req, res) => res.send("Hello World!"));

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/universities", universityRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/semesters", semesterRoutes);
app.use("/api/subjects", subjectRoutes);

app.listen(port, () => {
  console.log(`Server is running at ${port} `);
});

//shrinath
// const express = require("express");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const app = express();
// app.use(express.json());

// mongoose.set("bufferCommands", false);

// console.log("MONGO_URI =", process.env.MONGO_URI);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");

//     app.use("/api/auth", require("./routes/authRoute"));

//     app.listen(5000, () => {
//       console.log("Server running on port 5000");
//     });
//   })
//   .catch((err) => {
//     console.error("MongoDB connection failed");
//     console.error(err);
//   });
