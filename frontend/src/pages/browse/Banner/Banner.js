import React, { useState, useEffect } from "react";

import classes from "./Banner.module.css";

function Banner(props) {
  //khai báo state để lưu dữ liệu film sau khi random
  const [backdrop, setBackdrop] = useState("");
  const [name, setName] = useState("");
  const [overview, setOverview] = useState("");

  //Dữ liệu được truyền từ component cha(Browse)
  const { data } = props;

  //Random film từ data
  useEffect(() => {
    if (data && data.results?.length) {
      const randomMovie =
        data.results[Math.floor(Math.random() * data.results.length - 1)];
      //Lưu nội dung film đã random vào các state đã khai báo trước
      setBackdrop(randomMovie?.backdrop_path);
      setName(randomMovie?.name);
      setOverview(randomMovie?.overview);
    }
  }, [data]);

  //Nếu chưa có dữ liệu thì hiển thị Loading..
  if (!backdrop) return <p>Banner Loding...</p>;

  return (
    <div className={classes.banner}>
      <img
        className={classes.bannerImg}
        src={backdrop && `https://image.tmdb.org/t/p/w500${backdrop}`}
        alt="banner"
      />

      <div className={classes.bannerContent}>
        <h3 className={classes.name}>{name}</h3>
        <div className={classes.action}>
          <div className={classes.btn}>Play</div>
          <div className={classes.btn}>My List</div>
        </div>
        <p className={classes.overview}>{overview}</p>
      </div>
    </div>
  );
}

export default Banner;
