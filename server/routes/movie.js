const express = require("express");
const router = express.Router();
const multer = require("multer");
const Movies = require("../models/movieModel");
const movieModel = require("../models/movieModel");

// Get All Movies
router.get("/", async (req, res) => {
  try {
    const usersList = await Movies.find().select("title ratings genre");
    res.status(200).json(usersList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// Get All Movies with Genre
router.get("/moviesWithGenre", async (req, res) => {
  try {
    const usersList = await Movies.find()
      .where("genre")
      .ne([])
      .select("title ratings genre imageName")
      .populate("genre");
    res.status(200).json(usersList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// Update Movie with Genre
router.put("/update", async (req, res) => {
  try {
    const movie = {
      imageName: req.body.image,
      title: req.body.title,
      ratings: req.body.ratings,
      genre: req.body.genre,
    };
    const movieList = await Movies.findByIdAndUpdate(req.body.id, {
      ...movie,
    });
    res.status(200).json(movieList);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/movieById", async (req, res) => {
  try {
    const movie = await Movies.findById(req.body.id);
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// Create new Movie\

router.post("/", async (req, res) => {
  try {
    const isExist = await Movies.findOne({ title: req.body.title });
    if (!isExist) {
      const movieList = await Movies.create(req.body);
      return res.status(200).json(movieList);
    }

    return res.status(400).json({
      message: "Movie with this name already exist",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/filter", async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const { selectedGenres, filterStar } = req.body;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(pageSize);
    const skipCount = (pageNumber - 1) * limitNumber;
    let filter = {};
    if (selectedGenres.length > 0) {
      const genreId = selectedGenres.map((genre) => genre.value);
      filter.genre = { $all: genreId };
    }
    if (filterStar > 0) {
      filter.ratings = (filterStar - 1) * 25;
    }
    let filterList = await movieModel
      .find(filter)
      .populate("genre")
      .sort({ createdAt: "desc" })
      .skip(skipCount)
      .limit(limitNumber);
    const totalCount = await movieModel.countDocuments(filter);
    const totalPage = Math.ceil(totalCount / limitNumber);
    res.json({
      movieList: filterList,
      pageNumber,
      totalPage,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  const deletedMovie = await Movies.findByIdAndDelete(req.body.id);
  res.json(deletedMovie);
});
module.exports = router;
