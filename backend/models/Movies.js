const fs = require("fs");
const path = require("path");

module.exports = class Movie {
  static all() {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "data", "movieList.json"),
        "utf8"
      )
    );
  }

  static genre() {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "data", "genreList.json"),
        "utf8"
      )
    );
  }

  static video() {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "data", "videoList.json"),
        "utf8"
      )
    );
  }

  static mediaType() {
    return JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "..", "data", "mediaTypeList.json"),
        "utf8"
      )
    );
  }
};
