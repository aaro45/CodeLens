require("dotenv").config();

const geminiRoutes = require("./routes/geminiRoutes");
const historyRoutes = require("./routes/historyRoutes");
const authRoutes = require("./routes/authRoutes");
const githubRoutes = require("./routes/githubRoutes");

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
connectDB();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://codelens-frontend-snowy.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/gemini", geminiRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/github", githubRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CodeLens Backend Running 🚀"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});