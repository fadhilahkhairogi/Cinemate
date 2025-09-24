// config/movieDataLoader.js
import fs from "fs";
import path from "path";
import Movie from "../models/movie.js";
import Schedule from "../models/schedule.js";

export default async function loadMovieData() {
  try {
    // const __filename = fileURLToPath(import.meta.url);
    // const __dirname = path.dirname(__filename);
    // const filePath = path.join(__dirname, "../data/moviesData.json");
    const filePath = "./data/moviesData.json";

    if (!fs.existsSync(filePath)) {
      console.error("ERROR: moviesData.json not found!");
      return;
    }

    const jsonData = fs.readFileSync(filePath, "utf-8");
    const movies = JSON.parse(jsonData);

    for (const movie of movies) {
      // Create the movie first
      const createdMovie = await Movie.create(movie);

      if (movie.scheduleTime && Array.isArray(movie.scheduleTime)) {
        for (const time of movie.scheduleTime) {
          await Schedule.create({
            time,                // assuming Schedule has a "time" field
            movieId: createdMovie.id, // FK relationship
          });
        }
      }
    }

    console.log("✅ Movies data loaded successfully!");
  } catch (err) {
    console.error("❌ Error loading movies data:", err);
  }
}

