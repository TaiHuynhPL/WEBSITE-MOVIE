import React, { createContext, useState } from "react";

//Sử dụng context để lưu state cục bộ cho Movie hiện tại người dùng đang xem
const MovieContext = createContext();

function MovieProvider({ children }) {
  const [currentMovie, setCurrentMovie] = useState({
    id: "",
    name: "",
    releaseDate: "",
    vote: "",
    overview: "",
    backdrop: "",
    type: null,
  });

  const value = {
    currentMovie,
    setCurrentMovie,
  };
  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export { MovieContext, MovieProvider };
