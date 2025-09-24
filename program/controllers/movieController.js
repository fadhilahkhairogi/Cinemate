// controllers/movieController.js
import { Op } from "sequelize";
import Movie from "../models/movie.js";

// GET /movies/view
export async function showMoviesPage(req, res) {
  const { ["filter-genre"]: genre, title: name } = req.query;
  let movies;
  let message;

  const hasGenre = genre && genre.trim() !== "";
  const hasName = name && name.trim() !== "";

  if (hasGenre && hasName) {
    const byName = await Movie.findAll({
      where: { name: { [Op.like]: `%${name.trim()}%` } }, 
    });

    movies = byName.filter((m) =>
      m.genres.some((g) => g.toLowerCase() === genre.trim().toLowerCase())
    );

    if (movies.length === 0) {
      message = `No movies found matching title '${name}' and genre '${genre}'.`;
      movies = await Movie.findAll();
    }
  } else if (hasGenre) {
    movies = await Movie.findAll();
    // filter manually because genres is JSON array
    movies = movies.filter((m) =>
      m.genres.some((g) => g.toLowerCase() === genre.trim().toLowerCase())
    );
    if (movies.length === 0) {
      message = `No movies found for genre: ${genre}`;
      movies = await Movie.findAll();
    }
  } else if (hasName) {
    movies = await Movie.findAll({
      where: { name: { [Op.like]: `%${name.trim()}%` } },
    });
    if (movies.length === 0) {
      message = `No movies found for title: ${name}`;
      movies = await Movie.findAll();
    }
  } else {
    movies = await Movie.findAll();
  }

  res.render("movies", { movies, message, title: name || '', genre: genre || '' });

}

// GET /movies/:movieId
export async function getMovieDetail(req, res) {
  try {
    const movie = await Movie.findByPk(req.params.movieId);
    if (!movie) {
      return res.status(404).render("404", { errorMessage: "Movie not found" });
    }
    res.render("movie-detail", { movie });
  } catch (err) {
    res.status(500).render("404", { errorMessage: err.message });
  }
}

// GET /movies/search
export async function searchMovies(req, res) {
  const { title } = req.query;
  let movies;
  let message;

  if (!title || title.trim() === "") {
    movies = await Movie.findAll();
    return res.render("movies", { movies });
  }

  movies = await Movie.findAll({
    where: { name: { [Op.like]: `%${title.trim()}%` } },
  });

  if (movies.length === 0) {
    message = `No movies found matching '${title}'. Showing all movies.`;
    movies = await Movie.findAll();
  } else {
    message = `Search results for '${title}'.`;
  }

  res.render("movies", { movies, message });
}

// GET /movies/genre
export async function showMoviesGenre(req, res) {
  const { ["filter-genre"]: genre } = req.query;
  let movies;
  let message;

  if (!genre || genre.trim() === "") {
    movies = await Movie.findAll();
    return res.render("movies", { movies });
  }

  movies = await Movie.findAll();
  movies = movies.filter((m) =>
    m.genres.some((g) => g.toLowerCase() === genre.trim().toLowerCase())
  );

  if (movies.length === 0) {
    message = `No movies found matching genre: ${genre}. Showing all movies.`;
    movies = await Movie.findAll();
  }

  res.render("movies", { movies, message });
}
