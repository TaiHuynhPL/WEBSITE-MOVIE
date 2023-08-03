import React, { useContext } from "react";

import { MovieContext } from "../../movieContext";
import NavBar from "./NavBar/NavBar";
import Banner from "./Banner/Banner";
import MovieList from "./MovieList/MovieList";
import MovieDetail from "./MovieDetail/MovieDetail";
import useFetch from "../../hooks/use-fetch";
import classes from "./Browse.module.css";

//Component trang Browse (trang chính)
function Browse() {
  //khai báo biến để lấy dữ liệu state cục bộ movie hiện tại
  const movieCtx = useContext(MovieContext);

  //=======================
  //Sử dụng hooks useFetch đã custom để lấy tất cả dữ liệu của film
  const dataNetflixOriginals = useFetch("/top-rate/1");
  const dataTrending = useFetch("/trending");
  const dataTopRated = useFetch("/top-rate/2");
  const dataActionMovies = useFetch("/discover/28");
  const dataComedyMovies = useFetch("/discover/35");
  const dataHorrorMovies = useFetch("/discover/27");
  const dataRomanceMovies = useFetch("/discover/10749");
  const dataDocumentaries = useFetch("/discover/99");

  //=====================
  //Dựa vào state cục bộ movie hiện tại người dùng đang xem mà hiển thị chi tiết film đúng nội dung và vị trí
  const detailOriginals = movieCtx.currentMovie?.type === "Originals" && (
    <MovieDetail />
  );
  const detailTrending = movieCtx.currentMovie?.type === "Trending" && (
    <MovieDetail />
  );
  const detailTopRated = movieCtx.currentMovie?.type === "TopRated" && (
    <MovieDetail />
  );
  const detailActionMovies = movieCtx.currentMovie?.type === "ActionMovies" && (
    <MovieDetail />
  );
  const detailComedyMovies = movieCtx.currentMovie?.type === "ComedyMovies" && (
    <MovieDetail />
  );
  const detailHorrorMovies = movieCtx.currentMovie?.type === "HorrorMovies" && (
    <MovieDetail />
  );
  const detailRomanceMovies = movieCtx.currentMovie?.type ===
    "RomanceMovies" && <MovieDetail />;
  const detailDocumentaries = movieCtx.currentMovie?.type ===
    "Documentaries" && <MovieDetail />;

  //  Hiển thị nội dung khi đã fetch dữ liệu thành công
  if (
    dataNetflixOriginals.results &&
    dataTrending.results &&
    dataTopRated.results &&
    dataActionMovies.results &&
    dataComedyMovies.results &&
    dataHorrorMovies.results &&
    dataRomanceMovies.results &&
    dataDocumentaries.results
  ) {
    return (
      <div className={classes.browse}>
        <NavBar />
        <Banner data={dataNetflixOriginals} />
        <MovieList
          data={dataNetflixOriginals}
          isBackdrop={false}
          type="Originals"
        />
        {detailOriginals}
        <h3 className={classes.title}>Xu hướng</h3>
        <MovieList data={dataTrending} type="Trending" />
        {detailTrending}
        <h3 className={classes.title}>Xếp hạng cao</h3>
        <MovieList data={dataTopRated} type="TopRated" />
        {detailTopRated}
        <h3 className={classes.title}>Hành động</h3>
        <MovieList data={dataActionMovies} type="ActionMovies" />
        {detailActionMovies}
        <h3 className={classes.title}>Hài</h3>
        <MovieList data={dataComedyMovies} type="ComedyMovies" />
        {detailComedyMovies}
        <h3 className={classes.title}>Kinh dị</h3>
        <MovieList data={dataHorrorMovies} type="HorrorMovies" />
        {detailHorrorMovies}
        <h3 className={classes.title}>Lãng mạn</h3>
        <MovieList data={dataRomanceMovies} type="RomanceMovies" />
        {detailRomanceMovies}
        <h3 className={classes.title}>Tài liệu</h3>
        <MovieList data={dataDocumentaries} type="Documentaries" />
        {detailDocumentaries}
      </div>
    );
    //Còn nếu chưa fetch được dữ liệu thì hiển thị Loading...
  } else {
    return <p>Loading...</p>;
  }
}

export default Browse;
