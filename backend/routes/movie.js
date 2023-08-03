const express = require("express");

const movieController = require("../controllers/movie");

const router = express.Router();

router.get("/api/movies/trending/:page", movieController.getMovieTrending);
router.get("/api/movies/trending", movieController.getMovieTrending);

router.get("/api/movies/top-rate/:page", movieController.getMovieRating);
router.get("/api/movies/top-rate", movieController.getMovieRating);

router.get(
  "/api/movies/discover/:genre/:page",
  movieController.getMovieDiscover
);
router.get("/api/movies/discover/:genre", movieController.getMovieDiscover);
router.get("/api/movies/discover", movieController.getMovieDiscover);

router.post("/api/movies/video", movieController.postMovieVideo);

router.post("/api/movies/search", movieController.postMovieSearch);

router.get("/api/movies/genreList", movieController.getMovieGenreList);
router.get("/api/movies/mediaType", movieController.getMovieMediaType);

router.get("/api/movies", movieController.getMovie);

module.exports = router;
