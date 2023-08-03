import React, { useContext } from "react";

import { MovieContext } from "../../../movieContext";
import classes from "./MovieList.module.css";

function MovieList(props) {
  //lấy dữ liệu từ componant cha(Browse) để hiển thị nội dung
  const { data, isBackdrop = true, type } = props;
  const movies = data.results;

  //khai báo biến để lấy dữ liệu state cục bộ movie hiện tại
  const movieCtx = useContext(MovieContext);

  //Hàm khi click vào 1 movie nào đó
  const movieHandler = (event) => {
    //nếu movie người dùng click khác với  movie hiện tại thì set lại movie hiện tại để hiện thị chính xác
    if (event.target.id !== movieCtx.currentMovie.id) {
      movieCtx.setCurrentMovie({
        id: event.target.id,
        name: event.target.name,
        releaseDate: event.target.getAttribute("releasedate"),
        vote: event.target.getAttribute("vote"),
        overview: event.target.getAttribute("overview"),
        backdrop: event.target.getAttribute("backdrop"),
        type: event.target.getAttribute("type"),
      });
      //Còn nếu trùng thì set movie hiện tại là rỗng để không hiển thị moviedetail
    } else {
      movieCtx.setCurrentMovie({
        id: "",
        name: "",
        releaseDate: "",
        vote: "",
        overview: "",
        backdrop: "",
        type: null,
      });
    }
  };

  //Nếu chưa có dữ liệu thì hiển thị Loading..
  if (!movies) return <p>loading...</p>;
  return (
    <div className={classes.movieList}>
      {movies.map((movie) => {
        return (
          <img
            key={movie.id}
            id={movie.id}
            name={movie.name || movie.title}
            releasedate={movie.release_date}
            vote={movie.vote_average}
            overview={movie.overview}
            backdrop={movie.backdrop_path}
            type={type}
            src={
              isBackdrop
                ? movie.backdrop_path &&
                  `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : movie.poster_path &&
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            }
            alt={movie.name ? movie.name : movie.title}
            onClick={movieHandler}
          />
        );
      })}
    </div>
  );
}

export default MovieList;
