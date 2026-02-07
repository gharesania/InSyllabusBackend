const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 5000;

// Connect database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Server Connection Testing
app.get("/", (req, res) => res.send("Hello World!"));

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/cart", require("./routes/cartRoute"));
app.use("/api/universities", require("./routes/universityRoute"));
app.use("/api/programs", require("./routes/programRoute"));
app.use("/api/branches", require("./routes/branchRoute"));
app.use("/api/semesters", require("./routes/semesterRoute"));
app.use("/api/subjects", require("./routes/subjectRoute"));

app.listen(port, () => {
  console.log(`Server is running at ${port} `);
});
