import React, { useState, useContext } from "react";

import { MovieContext } from "../../../movieContext";
import classes from "./SearchFrom.module.css";

function SearchForm(props) {
  //State để lưu giá trị cho ô input
  const [valueInput, setValueInput] = useState("");

  //khai báo biến để lấy dữ liệu state cục bộ movie hiện tại
  const movieCtx = useContext(MovieContext);

  //Hàm khi người dùng thay đổi (nhập) vào ô input để set lại giá trị valueInput
  const changeInputHandler = (event) => {
    setValueInput(event.target.value);
  };

  //Hàm khi click vào nut search => chuyển dữu liệu valueInput cho component cha(Search)
  const searchHandler = () => {
    props.onSearch(valueInput);
  };

  //Hàm khi click vào nut reset
  const resetHandler = () => {
    //set lại giá trị rỗng cho ô input
    setValueInput("");
    //set lại state cục bộ movie hiện tại là rỗng
    movieCtx.setCurrentMovie({
      id: "",
      name: "",
      releaseDate: "",
      vote: "",
      overview: "",
      backdrop: "",
    });
    //chuyển giá trị rỗng lên component cha(Search)
    props.onReset("");
  };

  return (
    <div className={classes.searchFrom}>
      <div className={classes.input}>
        <input type="text" value={valueInput} onChange={changeInputHandler} />
        <svg
          className="svg-inline--fa fa-search fa-w-16"
          fill="#ccc"
          aria-hidden="true"
          data-prefix="fas"
          data-icon="search"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
        </svg>
      </div>
      <div className={classes.btn}>
        <button onClick={resetHandler}>RESET</button>
        <button className={classes.btnSearch} onClick={searchHandler}>
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
