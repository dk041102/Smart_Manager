const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log("METHOD:", req.method, "PATH:", JSON.stringify(req.path));
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(8000, () => console.log("Server running on port 8000"));
