const Movie = require("../models/Movies");

exports.getMovie = (req, res) => {
  const movies = Movie.all().sort((a, b) => b.popularity - a.popularity);
  res.send(movies);
};

exports.getMovieTrending = (req, res) => {
  const perPage = 20;
  const page = Number(req.params.page) || 1;
  const movies = Movie.all().sort((a, b) => b.popularity - a.popularity);
  const data = {
    results: movies.splice(perPage * page - perPage, perPage),
    page: page,
    total_pages: Math.ceil(movies.length / perPage) + 1,
  };
  res.status(200).json(data);
};

exports.getMovieRating = (req, res) => {
  const perPage = 20;
  const page = Number(req.params.page) || 1;
  const movies = Movie.all().sort((a, b) => b.vote_average - a.vote_average);
  const data = {
    results: movies.splice(perPage * page - perPage, perPage),
    page: page,
    total_pages: Math.ceil(movies.length / perPage) + 1,
  };
  res.status(200).json(data);
};

exports.getMovieDiscover = (req, res) => {
  const perPage = 20;
  const page = Number(req.params.page) || 1;
  const genreParams = Number(req.params.genre);
  const movies = Movie.all();
  const genre = Movie.genre();
  const moviesGenre = movies.filter((movie) =>
    movie.genre_ids.includes(genreParams)
  );
  let genre_name;
  for (let val of genre) {
    if (val.id === genreParams) {
      genre_name = val.name;
    }
  }
  const data = {
    results: moviesGenre.splice(perPage * page - perPage, perPage),
    page: page,
    total_pages: Math.ceil(moviesGenre.length / perPage) + 1,
    genre_name: genre_name,
  };
  if (!genreParams) {
    res.status(400).json({ message: "Not found gerne parram" });
  }
  if (!genre_name) {
    res.status(400).json({ message: "Not found that gerne id" });
  }
  res.status(200).json(data);
};

exports.postMovieVideo = (req, res) => {
  const id = Number(req.body.film_id);
  if (!id) {
    res.status(400).json({ message: "Not found film_id parram" });
  } else {
    const videoList = Movie.video();
    let video;
    for (let val of videoList) {
      if (val.id === id) {
        video = val.videos;
      }
    }
    let resultVideo =
      video?.filter(
        (v) =>
          v.official === true && v.site === "YouTube" && v.type === "Trailer"
      ) ||
      video?.filter(
        (v) =>
          v.official === true && v.site === "YouTube" && v.type === "Teaser"
      );

    if (resultVideo?.length > 1) {
      resultVideo = resultVideo.reduce((result, video) => {
        if (video.published_at > result.published_at) {
          result = video;
        }
        return result;
      }, resultVideo[0]);
    }

    if (!resultVideo) {
      res.status(404).json({ message: "Not found video" });
    }
    res.status(200).json(resultVideo[0]);
  }
};

exports.postMovieSearch = (req, res) => {
  const query = req.body.keyword.toLowerCase();
  let results;
  if (!query) {
    res.status(400).json({ message: "Not found keyword parram" });
  } else {
    const movies = Movie.all();
    results = movies.filter((movie) => {
      const title = movie.title;
      const overview = movie.overview;
      return (
        title?.toLowerCase().includes(query) ||
        overview?.toLowerCase().includes(query)
      );
    });
    const genre = Number(req.body.genre);
    const mediaType = req.body.mediaType;
    const language = req.body.language;
    const year = Number(req.body.year);

    if (genre) {
      results = results.filter((movie) => movie.genre_ids.includes(genre));
    }
    if (mediaType) {
      if (mediaType === "all") {
        results = results;
      } else {
        results = results.filter((movie) => movie.media_type === mediaType);
      }
    }
    if (language) {
      results = results.filter((movie) => movie.original_language === language);
    }
    if (year) {
      results = results.filter((movie) => {
        const release_date = new Date(movie.release_date);
        const first_air_date = new Date(movie.first_air_date);
        if (release_date) {
          return release_date.getFullYear() === year;
        } else if (first_air_date) {
          return first_air_date.getFullYear() === year;
        } else {
          return true;
        }
      });
    }
    const perPage = 20;
    const page = Number(req.params.page) || 1;
    const data = {
      results: results.splice(perPage * page - perPage, perPage),
      page: page,
      total_pages: Math.ceil(results.length / perPage) + 1,
    };
    res.status(200).json(data);
  }
};

exports.getMovieGenreList = (req, res) => {
  const genre = Movie.genre();
  res.json(genre);
};

exports.getMovieMediaType = (req, res) => {
  const mediaType = Movie.mediaType();
  res.json(mediaType);
};
