import React, { useContext } from "react";

import { MovieContext } from "../../../movieContext";
import MovieDetail from "../../browse/MovieDetail/MovieDetail";
import classes from "./ResultList.module.css";

function ResultList(props) {
  //khai báo biến để lấy dữ liệu state cục bộ movie hiện tại
  const movieCtx = useContext(MovieContext);

  //Hàm khi click vào movie
  const movieHandler = (event) => {
    //Nếu movie hiện tại không trùng với movie đang xem thì set lại giá trị state cục bộ movie hiện tại để hiển thị chính xác
    if (event.target.id !== movieCtx.currentMovie.id) {
      movieCtx.setCurrentMovie({
        id: event.target.id,
        name: event.target.name,
        releaseDate: event.target.getAttribute("releasedate"),
        vote: event.target.getAttribute("vote"),
        overview: event.target.getAttribute("overview"),
        backdrop: event.target.getAttribute("backdrop"),
      });
      //Còn nếu trùng thì set lại giá trị movie hiện tại là rỗng để không còn hiển thị movieDetail
    } else {
      movieCtx.setCurrentMovie({
        id: "",
        name: "",
        releaseDate: "",
        vote: "",
        overview: "",
        backdrop: "",
      });
    }
  };

  //Biến để hiển thị movieDetail
  const detailSearchMovie = movieCtx.currentMovie?.id && <MovieDetail />;

  return (
    <React.Fragment>
      <h3 className={classes.title}>Search Result</h3>
      <div className={classes.list}>
        {props.movielist
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <img
              key={movie.id}
              id={movie.id}
              name={movie.name || movie.title}
              releasedate={movie.release_date}
              vote={movie.vote_average}
              overview={movie.overview}
              backdrop={movie.backdrop_path}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className={classes.item}
              onClick={movieHandler}
            />
          ))}
      </div>
      {detailSearchMovie}
    </React.Fragment>
  );
}

export default ResultList;
