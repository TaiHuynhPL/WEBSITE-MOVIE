import React, { useState, useEffect } from "react";

import NavBar from "../browse/NavBar/NavBar";
import SearchForm from "./SearchForm/SearchForm";
import ResultList from "./ResultList/ResultList";
import classes from "./Search.module.css";

//omponent trang search
const Search = () => {
  const [query, setQuery] = useState("");
  const [moviesList, setMoviesList] = useState();
  const [optionGenre, setOptionGenre] = useState(null);
  const [optionMediaType, setOptionMediaType] = useState(null);
  const [genre, setGenre] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");

  //hàm khi click vào nút search và set lại giá trị query là nội dung người dùng nhập
  const searchHandler = (inputValue) => {
    setQuery(inputValue);
  };

  //Hàm khi click vào nút reset và set lại giá trị query là rỗng
  const resetHandler = (emptyvalue) => {
    setQuery(emptyvalue);
  };

  //Sử dung useEffect để fetch api dữ liệu search
  useEffect(() => {
    if (query) {
      const fetchapi = async function () {
        try {
          const response = await fetch(
            "http://localhost:5000/api/movies/search",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                keyword: query,
                token: "8qlOkxz4wq",
                genre,
                mediaType,
                language,
                year,
              }),
            }
          );
          if (!response) {
            throw new Error("Some thing went wrong");
          }
          const data = await response.json();

          setMoviesList(data.results);
        } catch (error) {
          console.log("Error message: " + error.message);
        }
      };

      fetchapi();
    }
  }, [query, genre, mediaType, language, year]);

  useEffect(() => {
    const fetchapi = async function () {
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies/genreList?token=8qlOkxz4wq`
        );
        if (!response) {
          throw new Error("Some thing went wrong");
        }
        const data = await response.json();

        setOptionGenre(data);
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };
    fetchapi();
  }, []);

  useEffect(() => {
    const fetchapi = async function () {
      try {
        const response = await fetch(
          `http://localhost:5000/api/movies/mediaType?token=8qlOkxz4wq`
        );
        if (!response) {
          throw new Error("Some thing went wrong");
        }
        const data = await response.json();

        setOptionMediaType(data);
      } catch (error) {
        console.log("Error message: " + error.message);
      }
    };
    fetchapi();
  }, []);

  const changeGenre = (event) => {
    setGenre(event.target.value);
  };

  const changeMediaType = (event) => {
    setMediaType(event.target.value);
  };
  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };
  const changeYear = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <NavBar isHomeClassname={false} />
      <SearchForm onSearch={searchHandler} onReset={resetHandler} />
      <div className={classes.containerOption}>
        {optionGenre?.length > 0 && (
          <div className={classes.itemOption}>
            <label htmlFor="genre">Genre:</label>
            <select id="genre" onChange={changeGenre}>
              <option value={""}>Select genre</option>
              {optionGenre.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {optionMediaType && (
          <div className={classes.itemOption}>
            <label htmlFor="mediaType">Media Type:</label>
            <select id="mediaType" onChange={changeMediaType}>
              <option value={""}>Select Media Type</option>
              {optionMediaType.map((mediaType) => (
                <option key={mediaType} value={mediaType}>
                  {mediaType}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={classes.itemOption}>
          <label htmlFor="language">Language:</label>
          <select id="language" onChange={changeLanguage}>
            <option value={""}>Select language</option>
            <option value={"en"}>en-us</option>
            <option value={"ja"}>jp</option>
            <option value={"ko"}>kr</option>
          </select>
        </div>

        <div className={classes.itemOption}>
          <label htmlFor="year">Year:</label>
          <select id="year" onChange={changeYear}>
            <option value={""}>Select year</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
            <option value={2020}>2020</option>
            <option value={2019}>2019</option>
            <option value={2018}>2018</option>
            <option value={2017}>2017</option>
            <option value={2016}>2016</option>
            <option value={2015}>2015</option>
            <option value={2014}>2014</option>
            <option value={2013}>2013</option>
            <option value={2012}>2012</option>
            <option value={2011}>2011</option>
            <option value={2010}>2010</option>
            <option value={2009}>2009</option>
            <option value={2008}>2008</option>
            <option value={2007}>2007</option>
            <option value={2006}>2006</option>
            <option value={2005}>2005</option>
            <option value={2004}>2004</option>
            <option value={2003}>2003</option>
            <option value={2002}>2002</option>
            <option value={2001}>2001</option>
            <option value={2000}>2000</option>
          </select>
        </div>
      </div>

      {query && moviesList && <ResultList movielist={moviesList} />}
    </div>
  );
};

export default Search;
