require("dotenv").config();
// const axios = require('axios');
const { Genres } = require("../db");


async function getGenres() {
  try {
    let genresDb = await Genres.findAll();

    if (!genresDb.length) return { messageError: "Genres not found" }

    return genresDb.map(genre => genre.name)

  } catch (error) {
    return { messageError: "Error" }
  }

}

module.exports = {
  getGenres,
};
