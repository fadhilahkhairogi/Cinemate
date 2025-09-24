// index.js
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";        // Sequelize instance
import movieRoutes from "./routes/movieRoutes.js"; // Routes for movies
import path from "path";
import { fileURLToPath } from "url";
import loadMovieData from "./config/movieDataLoader.js";

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();


// Middleware to parse JSON
app.use(express.json());

app.set("view engine", "ejs");

// Set folder for views
app.set("views", path.join(__dirname, "views"));

// Optional: parse URL-encoded data if your forms send that
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

async function initApp() {
  try {
    await sequelize.sync({ force: false }); // create tables if missing
    console.log("Database synced");

    await loadMovieData(); // populate movies & schedules
  } catch (err) {
    console.error(err);
  }
}

initApp();

// Test root route
app.get("/", (req, res) => {
  res.send("Movie Ticket Application is running...");
});

// Mount movie routes
app.use("/movies", movieRoutes);

// Sync database (optional, only for dev)
// sequelize.sync({ force: false }) // force: true will drop tables each time
sequelize.sync()
  .then(() => console.log("Database synced"))
  .catch(err => console.error("DB sync error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Movie Ticket Application running on port ${PORT}`);
});
