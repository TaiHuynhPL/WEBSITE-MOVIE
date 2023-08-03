const express = require("express");

const app = express();

const cors = require("cors");

const PORT = 5000;

const movieRoutes = require("./routes/movie");

const authorize = require("./middleware/authorization");

app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", authorize(), movieRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
