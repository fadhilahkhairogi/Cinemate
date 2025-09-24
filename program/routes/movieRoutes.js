// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// Default route: redirect /movies → /movies/view
router.get("/", (req, res) => {
  res.redirect("/movies/view");
});

// Show all movies page
router.get("/view", movieController.showMoviesPage);

// Search movies by title
router.get("/search", movieController.searchMovies);

// Filter movies by genre
router.get("/genre", movieController.showMoviesGenre);

// Show movie detail by ID (must be last to prevent conflicts)
router.get("/:movieId", movieController.getMovieDetail);

module.exports = router;
