import path, { dirname } from "path";
import { fileURLToPath } from "url";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// Get the file path from URL of of current module
const __filename = fileURLToPath(import.meta.url);

// Get the directory name from the file path
const __dirname = dirname(__filename);

// MIDDLEWARE
app.use(express.json());
// Serve the HTML file from /public directory
// Tell express to serve all files from public folder as static assests / file. Any req to css files will be resolved to the public directory
app.use(express.static(path.join(__dirname, "./../public")));
// Serving up HTML file from /public directoy
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./../public/index.html"));
});

// ROUTES
app.use("/auth", authRoutes);
app.use("/todos", authMiddleware, todoRoutes);
export default app;
